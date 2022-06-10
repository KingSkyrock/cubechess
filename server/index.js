const express = require('express');
const path = require('path');

const http = require('http');
const webSocketServer = require('websocket').server;

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

var server = http.createServer(app);

var currentID = 0;
var rooms = {};
var clients = []
var users = {};

var wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function (req) {  
  var connection = req.accept(null, req.origin); 
  var connectionID = ++currentID;
  var index = clients.push(connection) - 1;

  users[connectionID] = {room: null, connection: connection}

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      var json = JSON.parse(message.utf8Data);
      if (json.type == "moved") {
        for (var x of rooms[json.room]) {
          users[x].connection.sendUTF(JSON.stringify({ type: 'boardUpdate', grid: json.grid, canMoveToGrid: json.canMoveToGrid, turn: json.turn }));
        }
      } else if (json.type == "joinRoom") {
        if (rooms[json.room] == undefined) {
          rooms[json.room] = [connectionID];
        } else {
          rooms[json.room].push(connectionID)
        }
        users[connectionID].room = json.room;
        console.log(rooms);
      }
    }
  });
  connection.on('close', function (connection) {
    if (rooms[users[connectionID].room] != undefined) {
      for (var i in rooms[users[connectionID].room]) {
        if (rooms[users[connectionID].room][i] == connectionID) {
          rooms[users[connectionID].room].splice(i, 1);
          if (rooms[users[connectionID].room].length == 0) {
            delete rooms[users[connectionID].room];
          }
        }
      }
    }
    console.log(rooms);
    delete users[connectionID]
    clients.splice(index, 1);
  });
});

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
 res.sendFile(HTML_FILE);
});


server.listen(port, function () {
  console.log('Websocket listening on port: ' + port);
});