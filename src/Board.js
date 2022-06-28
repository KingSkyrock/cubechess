import React from 'react';
import './styles.scss';
import App from "./App";
import * as P from './Pieces';


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
    this.enPassant; //two coordinates
    this.grid;
    this.red = [];
    this.colorInCheck = null;

    this.state = {
      playerColor: null,
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
        if (grid[i][j] instanceof P.Piece && grid[i][j].color == color) {
          if (grid[i][j] instanceof P.Pawn) {
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

    var drawingGrid = this.grid.map((arr) => {
      return arr.slice();
    });
    if (this.canMoveTo != null) {
      var drawingCanMoveTo = this.canMoveTo.map((arr) => {
        return arr.slice();
      });
    }

    if (this.state.playerColor == Board.BLACK) {
      drawingGrid = drawingGrid.reverse();
      if (drawingCanMoveTo != null) {
        for (i in drawingCanMoveTo) {
          drawingCanMoveTo[i][1] = 7 - drawingCanMoveTo[i][1];
        }
      }
      
    }

    ctx.font = Math.round(this.state.length / 8)+"px Arial";
    for (var i = 0, boardX, boardY; i < drawingGrid.length; i++) {
      for (var j = 0; j < drawingGrid[i].length; j++) {
        boardX = j * gridUnit + x;
        boardY = (i + 1) * gridUnit + y;

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
        ctx.fillRect(boardX, i * gridUnit + y, gridUnit, gridUnit);

        if (drawingGrid[i][j] instanceof P.Piece && drawingGrid[i][j].color == Board.WHITE) {
          ctx.fillStyle = "#FFFFFF";
        } else if (drawingGrid[i][j] instanceof P.Piece && drawingGrid[i][j].color == Board.BLACK) {
          ctx.fillStyle = "#000000";
        }

        if (drawingGrid[i][j] instanceof P.Rook) {
          ctx.fillText("R", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Bishop) {
          ctx.fillText("B", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Pawn && !(drawingGrid[i][j] instanceof P.AntiPawn)) {
          ctx.fillText("P", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Queen) {
          ctx.fillText("Q", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Knight) {
          ctx.fillText("K", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.King) {
          ctx.fillText("O", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Wazir) {
          ctx.fillText("W", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Ferz) {
          ctx.fillText("F", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.Mann) {
          ctx.fillText("M", boardX, boardY);
        } else if (drawingGrid[i][j] instanceof P.AntiPawn) {
          ctx.fillText("d", boardX, boardY);
        }
      }
    }
    for (var i in drawingCanMoveTo) {
      ctx.fillStyle = '#00ff00';
      ctx.beginPath();
      ctx.arc(drawingCanMoveTo[i][0] * gridUnit + x + gridUnit / 2, drawingCanMoveTo[i][1] * gridUnit + y + gridUnit / 2, gridUnit / 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = '#000000';
    }
  }

  componentDidMount() {
    this.grid = [];
    for (var i = 0; i < 8; i++) {
      this.grid.push([null, null, null, null, null, null, null, null, null, null]);
    }

    this.canMoveToGrid = [];
    for (var i = 0; i < 8; i++) {
      this.canMoveToGrid.push([null, null, null, null, null, null, null, null, null, null]);
    }

    var team = { color: Board.WHITE, row1: P.AntiPawn, row2: { c0: P.Mann, c1: P.Rook, c2: P.Knight, c3: P.Bishop, c4: P.Queen, }}
    var enemyTeam = { color: Board.BLACK, row1: P.AntiPawn, row2: { c0: P.Mann, c1: P.Rook, c2: P.Knight, c3: P.Bishop, c4: P.Queen, } } //will be fetched from server

    for (var i = 0; i < 10; i++) {
      if (team.color == Board.WHITE) {
        this.grid[6][i] = new team.row1(Board.WHITE);
      } else if (enemyTeam.color == Board.WHITE) {
        this.grid[6][i] = new enemyTeam.row1(Board.WHITE);
      }
      if (team.color == Board.BLACK) {
        this.grid[1][i] = new team.row1(Board.BLACK);
      } else if (enemyTeam.color == Board.BLACK) {
        this.grid[1][i] = new enemyTeam.row1(Board.BLACK);
      }
    }

    if (team.color == Board.WHITE) {
      this.grid[7][0] = new team.row2.c0(Board.WHITE);
      this.grid[7][1] = new team.row2.c1(Board.WHITE);
      this.grid[7][2] = new team.row2.c2(Board.WHITE);
      this.grid[7][3] = new team.row2.c3(Board.WHITE);
      this.grid[7][4] = new team.row2.c4(Board.WHITE);
      this.grid[7][6] = new team.row2.c3(Board.WHITE);
      this.grid[7][7] = new team.row2.c2(Board.WHITE);
      this.grid[7][8] = new team.row2.c1(Board.WHITE);
      this.grid[7][9] = new team.row2.c0(Board.WHITE);
    } else if (enemyTeam.color == Board.WHITE) {
      this.grid[7][0] = new enemyTeam.row2.c0(Board.WHITE);
      this.grid[7][1] = new enemyTeam.row2.c1(Board.WHITE);
      this.grid[7][2] = new enemyTeam.row2.c2(Board.WHITE);
      this.grid[7][3] = new enemyTeam.row2.c3(Board.WHITE);
      this.grid[7][4] = new enemyTeam.row2.c4(Board.WHITE);
      this.grid[7][6] = new enemyTeam.row2.c3(Board.WHITE);
      this.grid[7][7] = new enemyTeam.row2.c2(Board.WHITE);
      this.grid[7][8] = new enemyTeam.row2.c1(Board.WHITE);
      this.grid[7][9] = new enemyTeam.row2.c0(Board.WHITE);
    }
    if (team.color == Board.BLACK) {
      this.grid[0][0] = new team.row2.c0(Board.BLACK);
      this.grid[0][1] = new team.row2.c1(Board.BLACK);
      this.grid[0][2] = new team.row2.c2(Board.BLACK);
      this.grid[0][3] = new team.row2.c3(Board.BLACK);
      this.grid[0][4] = new team.row2.c4(Board.BLACK);
      this.grid[0][6] = new team.row2.c3(Board.BLACK);
      this.grid[0][7] = new team.row2.c2(Board.BLACK);
      this.grid[0][8] = new team.row2.c1(Board.BLACK);
      this.grid[0][9] = new team.row2.c0(Board.BLACK);
    } else if (enemyTeam.color == Board.BLACK) {
      this.grid[0][0] = new enemyTeam.row2.c0(Board.BLACK);
      this.grid[0][1] = new enemyTeam.row2.c1(Board.BLACK);
      this.grid[0][2] = new enemyTeam.row2.c2(Board.BLACK);
      this.grid[0][3] = new enemyTeam.row2.c3(Board.BLACK);
      this.grid[0][4] = new enemyTeam.row2.c4(Board.BLACK);
      this.grid[0][6] = new enemyTeam.row2.c3(Board.BLACK);
      this.grid[0][7] = new enemyTeam.row2.c2(Board.BLACK);
      this.grid[0][8] = new enemyTeam.row2.c1(Board.BLACK);
      this.grid[0][9] = new enemyTeam.row2.c0(Board.BLACK);
    }

    this.grid[0][5] = new P.King(Board.BLACK);
    this.grid[7][5] = new P.King(Board.WHITE);


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
              json.grid[i][j] = new (P[json.grid[i][j].type])(json.grid[i][j].color, json.grid[i][j].firstMove)
            }
          }
        }
        this.canMoveToGrid = json.canMoveToGrid;
        this.enPassant = json.enPassant;
        this.grid = json.grid;
        this.setState({ turn: json.turn });
        this.drawBoard();
      } else if (json.type == 'color') {
        this.setState({playerColor: json.color});
        this.drawBoard();
      }
    }
  }

  isBoardStateInCheck(color, grid) {
    for (var x of Board.getAllAttacking(!color, grid)) {
      if (grid[x[1]][x[0]] instanceof P.King && grid[x[1]][x[0]].color == color) {
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
        if (this.grid[i][j] instanceof P.Piece && this.grid[i][j].color == color) {
          var canMoveTo = this.grid[i][j].getMovement(j, i, this.grid, this.enPassant);
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
    if (this.state.playerColor == Board.BLACK) {
      box[1] = 7 - box[1];
    }
    if (x > this.state.x && x < this.state.x + this.state.length && y > this.state.y && y < this.state.y + this.state.length - this.state.length / 5) {
      if (this.grid[box[1]][box[0]] instanceof P.Piece && this.grid[box[1]][box[0]].color == this.state.playerColor && this.state.turn == this.state.playerColor) {
        this.selected = box;
        this.canMoveTo = this.canMoveToGrid[box[1]][box[0]];
      } else if (this.selected != null) {
        for (var i of this.canMoveTo) {
          if (i[0] == box[0] && i[1] == box[1]) {
            if (this.enPassant && this.enPassant.coord[0] == box[0] && this.enPassant.coord[1] == box[1]) { //if move is en passant
              this.grid[this.enPassant.pieceCoord[1]][this.enPassant.pieceCoord[0]] = null;
            }
            this.grid[box[1]][box[0]] = this.grid[this.selected[1]][this.selected[0]];
            this.grid[this.selected[1]][this.selected[0]] = null;
            
            this.enPassant = null;
            if (this.grid[box[1]][box[0]] instanceof P.Pawn) {
              if (this.grid[box[1]][box[0]].firstMove && !(this.grid[box[1]][box[0]] instanceof P.AntiPawn)) {
                this.enPassant = this.grid[box[1]][box[0]].getEnPassant(this.selected[0], this.selected[1]);
              } else if (this.grid[box[1]][box[0]].firstMove) {
                this.enPassant = this.grid[box[1]][box[0]].getEnPassant(this.selected[0], this.selected[1], box[0]);
              }
              this.grid[box[1]][box[0]].firstMove = false;
            }

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
                enPassant: this.enPassant,
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
        <button onClick={() => this.setState({ playerColor: Board.WHITE }, () => this.drawBoard())}>white</button>
        <button onClick={() => this.setState({ playerColor: Board.BLACK }, () => this.drawBoard())}>black</button>
      </div>
    )
  }
}