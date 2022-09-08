const express = require('express');
const path = require('path');

const http = require('http');
const webSocketServer = require('websocket').server;

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(__dirname, '../assets');
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

  users[connectionID] = {room: null, color: null, connection: connection}

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      var json = JSON.parse(message.utf8Data);
      if (json.type == "moved") {
        for (var x of rooms[json.room]) {
          users[x].connection.sendUTF(JSON.stringify({ type: 'boardUpdate', grid: json.grid, canMoveToGrid: json.canMoveToGrid, enPassant: json.enPassant, turn: json.turn }));
        }
      } else if (json.type == "joinRoom") {
        if (rooms[json.room] == undefined) {
          rooms[json.room] = [connectionID];
        } else {
          rooms[json.room].push(connectionID)
        }
        users[connectionID].room = json.room;
        if (rooms[json.room].length == 1) {
          users[connectionID].color = true;
        } else if (rooms[json.room].length == 2) {
          users[connectionID].color = !users[rooms[json.room][0]].color;
        }
        users[connectionID].connection.sendUTF(JSON.stringify({ type: 'color', color: users[connectionID].color }))
        console.log(rooms);
      } else if (json.type == "randomRoom") {
        for (const room in rooms) {
          if (rooms[room].length < 2) {
            connection.sendUTF(JSON.stringify({ type: 'randomRoom', room: room }));
            break;
          }
        }
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

app.use('/assets', express.static(ASSETS_DIR));
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
 res.sendFile(HTML_FILE);
});

server.listen(port, function () {
  console.log('Websocket listening on port: ' + port);
});