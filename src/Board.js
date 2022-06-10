import React from 'react';
import './styles.scss';
import App from "./App";
import {Knight, Queen, Bishop, Pawn, Rook, Piece, King} from './Pieces';

export default class Board extends React.Component {

  static WHITE;
  static BLACK;

  static {
    this.WHITE = true;
    this.BLACK = false;
  }

  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.selected = null;
    this.canMoveTo = [];
    this.canMoveToGrid;
    this.grid;
    this.red = [];
    this.colorInCheck = null;

    this.state = {
      playerColor: Board.WHITE,
      turn: Board.WHITE,
      length: 700,
      x: 250,
      y: 100,
    }
  };

  static getAllAttacking(color, grid) {
    var allAttacking = [];
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j] instanceof Piece && grid[i][j].color == color) {
          if (grid[i][j] instanceof Pawn) {
            for (var coord of grid[i][j].getAttacking(j, i)) {
              allAttacking.push(coord);
            }
          } else {
            for (var coord of grid[i][j].getMovement(j, i, grid)) {
              allAttacking.push(coord);
            }
          }
        }
      }
    }
    return allAttacking;
  }

  drawBoard() {
    var canvas = this.canvas.current;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = this.state.x;
    var y = this.state.y;

    var gridUnit = this.state.length / 10;

    /*
    ctx.beginPath();
    for (var i = 0; i < 11; i++) {
      ctx.moveTo(x, i * gridUnit + y);
      ctx.lineTo(x + this.state.length, i * gridUnit + y);
    }
    for (var i = 0; i < 11; i++) {
      ctx.moveTo(i * gridUnit + x, y);
      ctx.lineTo(i * gridUnit + x, y + this.state.length);
    }

    ctx.closePath();
    ctx.stroke();*/

    ctx.font = Math.round(this.state.length/8)+"px Arial";
    for (var i = 0, boardX, boardY; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        boardX = i * gridUnit + x;
        boardY = (j + 1) * gridUnit + y;

        if (i % 2) {
          if (j % 2) {
            ctx.fillStyle = "#6f6a52";
          } else {
            ctx.fillStyle = "#baa48a";
          }
        } else {
          if (j % 2) {
            ctx.fillStyle = "#baa48a";
          } else {
            ctx.fillStyle = "#6f6a52";
          }
        }
        ctx.fillRect(boardX, j * gridUnit + y, gridUnit, gridUnit);

        if (this.grid[j][i] instanceof Piece && this.grid[j][i].color == Board.WHITE) {
          ctx.fillStyle = "#FFFFFF";
        } else if (this.grid[j][i] instanceof Piece && this.grid[j][i].color == Board.BLACK) {
          ctx.fillStyle = "#000000";
        }

        if (this.grid[j][i] instanceof Rook) {
          ctx.fillText("R", boardX, boardY);
        } else if (this.grid[j][i] instanceof Bishop) {
          ctx.fillText("B", boardX, boardY);
        } else if (this.grid[j][i] instanceof Pawn) {
          ctx.fillText("P", boardX, boardY);
        } else if (this.grid[j][i] instanceof Queen) {
          ctx.fillText("Q", boardX, boardY);
        } else if (this.grid[j][i] instanceof Knight) {
          ctx.fillText("K", boardX, boardY);
        } else if (this.grid[j][i] instanceof King) {
          ctx.fillText("O", boardX, boardY);
        }
      }
    }
    for (var i in this.canMoveTo) {
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.canMoveTo[i][0] * gridUnit + x, this.canMoveTo[i][1] * gridUnit + y, gridUnit, gridUnit);
      ctx.fillStyle = '#000000';
    }
  }

  componentDidMount() {
    const classes = new Map([
      ["Piece", Piece],
      ["Rook", Rook],
      ["Bishop", Bishop],
      ["Queen", Queen],
      ["Knight", Knight],
      ["Pawn", Pawn],
      ["King", King],
    ]);

    this.grid = [];
    for (var i = 0; i < 10; i++) {
      this.grid.push([null, null, null, null, null, null, null, null, null, null]);
    }

    this.canMoveToGrid = [];
    for (var i = 0; i < 10; i++) {
      this.canMoveToGrid.push([null, null, null, null, null, null, null, null, null, null]);
    }

    this.grid[1][1] = new Rook(Board.BLACK);
    this.grid[1][2] = new Knight(Board.BLACK);
    this.grid[1][3] = new Bishop(Board.BLACK);
    this.grid[1][4] = new Queen(Board.BLACK);
    this.grid[1][5] = new King(Board.BLACK);
    this.grid[1][6] = new Bishop(Board.BLACK);
    this.grid[1][7] = new Knight(Board.BLACK);
    this.grid[1][8] = new Rook(Board.BLACK);

    this.grid[8][1] = new Rook(Board.WHITE);
    this.grid[8][2] = new Knight(Board.WHITE);
    this.grid[8][3] = new Bishop(Board.WHITE);
    this.grid[8][4] = new Queen(Board.WHITE);
    this.grid[8][5] = new King(Board.WHITE);
    this.grid[8][6] = new Bishop(Board.WHITE);
    this.grid[8][7] = new Knight(Board.WHITE);
    this.grid[8][8] = new Rook(Board.WHITE);

    for (var i = 0; i < 8; i++) {
      this.grid[7][i + 1] = new Pawn(Board.WHITE);
      this.grid[2][i + 1] = new Pawn(Board.BLACK);
    }

    this.calculateMovable(Board.WHITE);
    this.drawBoard();

    App.connection.onopen = () => {
      App.connection.send(JSON.stringify({
        type: 'joinRoom',
        room: window.location.pathname
      }));
    }

    App.connection.onmessage = (message) => {
      var json = JSON.parse(message.data);
      if (json.type == 'boardUpdate') {
        for (var i = 0; i < json.grid.length; i++) {
          for (var j = 0; j < json.grid[i].length; j++) {
            if (json.grid[i][j] != null) {
              json.grid[i][j] = new (classes.get(json.grid[i][j].type))(json.grid[i][j].color, json.grid[i][j].firstMove)
            }
          }
        }
      }
      
      this.canMoveToGrid = json.canMoveToGrid;
      this.grid = json.grid;
      this.setState({turn: json.turn});
      this.drawBoard();
    }
  }

  isBoardStateInCheck(color, grid) {
    for (var x of Board.getAllAttacking(!color, grid)) {
      if (grid[x[1]][x[0]] instanceof King && grid[x[1]][x[0]].color == color) {
        return true;
      }
    }
    return false;
  }

  calculateMovable(color) {
    this.canMoveToGrid = [];
    for (var i = 0; i < 10; i++) {
      this.canMoveToGrid.push([null, null, null, null, null, null, null, null, null, null])
    }
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] instanceof Piece && this.grid[i][j].color == color) {
          var canMoveTo = this.grid[i][j].getMovement(j, i, this.grid);
          for (var k = canMoveTo.length - 1; k >= 0; k--) {
            var newArray = this.grid.map((arr) => {
              return arr.slice();
            });
            newArray[canMoveTo[k][1]][canMoveTo[k][0]] = newArray[i][j];
            newArray[i][j] = null;
            if (this.isBoardStateInCheck(color, newArray)) {
              canMoveTo.splice(k, 1);
            }
          }
          this.canMoveToGrid[i][j] = canMoveTo;
        }
      }
    }
  }

  handleClick(canvas, event) {
    var x = (event.pageX - canvas.offsetLeft);
    var y = (event.pageY - canvas.offsetTop);
    var box = [Math.floor((x - this.state.x) / (this.state.length / 10)), Math.floor((y - this.state.y) / (this.state.length / 10))]
    if (x > this.state.x && x < this.state.x + this.state.length && y > this.state.y && y < this.state.y + this.state.length) {
      if (this.grid[box[1]][box[0]] instanceof Piece && this.grid[box[1]][box[0]].color == this.state.playerColor && this.state.turn == this.state.playerColor) {
        this.selected = box;
        this.canMoveTo = this.canMoveToGrid[box[1]][box[0]];
      } else if (this.selected != null) {
        for (var i of this.canMoveTo) {
          if (i[0] == box[0] && i[1] == box[1]) {
            if (this.grid[this.selected[1]][this.selected[0]] instanceof Pawn) {
              this.grid[this.selected[1]][this.selected[0]].firstMove = false;
            }
            this.grid[box[1]][box[0]] = this.grid[this.selected[1]][this.selected[0]];
            this.grid[this.selected[1]][this.selected[0]] = null;
            this.selected = null;
            this.canMoveTo = null;
            this.setState({ turn: !this.state.turn }, () => {
              this.calculateMovable(this.state.turn);
              var total = 0;
              for (var j of this.canMoveToGrid) {
                for (var k of j) {
                  if (k != null) {
                    total += k.length;
                  }
                }
              }
              if (total == 0 && this.isBoardStateInCheck(this.state.turn, this.grid)) {
                alert("Checkmate: " + (this.state.turn == Board.WHITE ? "White" : (this.state.turn == Board.BLACK && "Black")) + " wins!");
              } else if (total == 0) {
                alert("Stalemate!");
              }

              App.connection.send(JSON.stringify({
                type: 'moved',
                grid: this.grid,
                canMoveToGrid: this.canMoveToGrid, 
                turn: this.state.turn, 
                room: window.location.pathname 
              }));
            });
          }
        }
      }
    } else {
      console.log("outside board");
    }
    this.drawBoard();
  }

  render() {
    return (
      <div>
        <canvas width="1000" height="900" onMouseDown={(e) => this.handleClick(this.canvas.current, e)} ref={this.canvas} className="game"></canvas>
        <button onClick={() => this.setState({playerColor: Board.WHITE })}>white</button>
        <button onClick={() => this.setState({ playerColor: Board.BLACK })}>black</button>
      </div>
    )
  }
}