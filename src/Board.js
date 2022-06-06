import React from 'react';
import './styles.scss';
import {Knight, Queen, Bishop, Pawn, Rook, Piece, King} from './Pieces';

export default class Board extends React.Component {

  static grid;
  static WHITE;
  static BLACK;

  static {

    this.grid = [ [null, null, null, null, null, null, null, null, null, null], 
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null, null],
                ]
    this.WHITE = true;
    this.BLACK = false;
  }

  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.selected = null;
    this.canMoveTo = [];
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
    ctx.stroke();

    for (var i in this.canMoveTo) {
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.canMoveTo[i][0] * gridUnit + x, this.canMoveTo[i][1] * gridUnit + y, gridUnit, gridUnit);
      ctx.fillStyle = '#000000';
    }

    for (var i in this.red) {
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(this.red[i][0] * gridUnit + x, this.red[i][1] * gridUnit + y, gridUnit, gridUnit);
      ctx.fillStyle = '#000000';
    }

    ctx.font = Math.round(this.state.length/8)+"px Arial";
    for (var i = 0, boardX, boardY; i < Board.grid.length; i++) {
      for (var j = 0; j < Board.grid[i].length; j++) {
        boardX = i * gridUnit + x;
        boardY = (j + 1) * gridUnit + y;
        if (Board.grid[j][i] instanceof Rook) {
          ctx.fillText("R", boardX, boardY);
        } else if (Board.grid[j][i] instanceof Bishop) {
          ctx.fillText("B", boardX, boardY);
        } else if (Board.grid[j][i] instanceof Pawn) {
          ctx.fillText("P", boardX, boardY);
        } else if (Board.grid[j][i] instanceof Queen) {
          ctx.fillText("Q", boardX, boardY);
        } else if (Board.grid[j][i] instanceof Knight) {
          ctx.fillText("K", boardX, boardY);
        } else if (Board.grid[j][i] instanceof King) {
          ctx.fillText("O", boardX, boardY);
        }
      }
    }
  }

  componentDidMount() {

    Board.grid[1][1] = new Rook(Board.BLACK);
    Board.grid[1][2] = new Knight(Board.BLACK);
    Board.grid[1][3] = new Bishop(Board.BLACK);
    Board.grid[1][4] = new Queen(Board.BLACK);
    Board.grid[8][5] = new King(Board.BLACK);
    Board.grid[1][6] = new Bishop(Board.BLACK);
    Board.grid[1][7] = new Knight(Board.BLACK);
    Board.grid[1][8] = new Rook(Board.BLACK);

    Board.grid[8][1] = new Rook(Board.WHITE);
    Board.grid[8][2] = new Knight(Board.WHITE);
    Board.grid[8][3] = new Bishop(Board.WHITE);
    Board.grid[8][4] = new Queen(Board.WHITE);
    Board.grid[8][5] = new King(Board.WHITE);
    Board.grid[8][6] = new Bishop(Board.WHITE);
    Board.grid[8][7] = new Knight(Board.WHITE);
    Board.grid[8][8] = new Rook(Board.WHITE);

    for (var i = 0; i < 8; i++) {
      Board.grid[7][i + 1] = new Pawn(Board.WHITE);
      Board.grid[2][i + 1] = new Pawn(Board.BLACK);
    }

    this.drawBoard();
  }

  isBoardStateInCheck(color, grid) {
    for (var x of Board.getAllAttacking(!color, grid)) {
      if (grid[x[1]][x[0]] instanceof King && grid[x[1]][x[0]].color == color) {
        return true;
      }
    }
    return false;
  }

  handleClick(canvas, event) {
    var x = (event.pageX - canvas.offsetLeft);
    var y = (event.pageY - canvas.offsetTop);
    var box = [Math.floor((x - this.state.x) / (this.state.length / 10)), Math.floor((y - this.state.y) / (this.state.length / 10))]
    if (x > this.state.x && x < this.state.x + this.state.length && y > this.state.y && y < this.state.y + this.state.length) {
      if (Board.grid[box[1]][box[0]] instanceof Piece && Board.grid[box[1]][box[0]].color == this.state.playerColor && this.state.turn == this.state.playerColor) {
        this.selected = box;
        this.canMoveTo = Board.grid[box[1]][box[0]].getMovement(box[0], box[1], Board.grid);
        for (var i = this.canMoveTo.length - 1; i >= 0; i--) {
          var newArray = Board.grid.map((arr) => {
            return arr.slice();
          });
          newArray[this.canMoveTo[i][1]][this.canMoveTo[i][0]] = newArray[this.selected[1]][this.selected[0]];
          newArray[this.selected[1]][this.selected[0]] = null;
          if (this.isBoardStateInCheck(this.state.turn, newArray)) {
            this.canMoveTo.splice(i, 1);
          }
        }
      } else if (this.selected != null) {
        for (var i of this.canMoveTo) {
          if (i[0] == box[0] && i[1] == box[1]) {
            if (Board.grid[this.selected[1]][this.selected[0]] instanceof Pawn) {
              Board.grid[this.selected[1]][this.selected[0]].firstMove = false;
            }
            Board.grid[box[1]][box[0]] = Board.grid[this.selected[1]][this.selected[0]];
            Board.grid[this.selected[1]][this.selected[0]] = null;
            this.selected = null;
            this.canMoveTo = null;
            this.setState({ turn: !this.state.turn });
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