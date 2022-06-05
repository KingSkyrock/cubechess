import React from 'react';
import './styles.scss';
import {Bishop, Pawn, Rook, Piece} from './Pieces';

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

    this.state = {
      playerColor: Board.WHITE,
      turn: Board.WHITE,
      length: 700,
      x: 150,
      y: 100,
    }
  };

  drawBoard() {
    var canvas = this.canvas.current;
    var ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 900;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var gridUnit = this.state.length / 10;

    for (var i = this.state.y; i < this.state.y + this.state.length + gridUnit; i += gridUnit) {
      ctx.beginPath();
      ctx.moveTo(this.state.x, i);
      ctx.lineTo(this.state.x + this.state.length, i);
      ctx.closePath();
      ctx.stroke();
      
    }
    for (var i = this.state.x; i < this.state.x + this.state.length + gridUnit; i += gridUnit) {
      ctx.beginPath();
      ctx.moveTo(i, this.state.y);
      ctx.lineTo(i, this.state.y + this.state.length);
      ctx.closePath();
      ctx.stroke();
    }

    for (var i in this.canMoveTo) {
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.canMoveTo[i][0] * gridUnit + this.state.x, this.canMoveTo[i][1] * gridUnit + this.state.y, gridUnit, gridUnit);
      ctx.fillStyle = '#000000';
    }

    ctx.font = Math.round(this.state.length/8)+"px Arial";
    for (var i = 0; i < Board.grid.length; i++) {
      for (var j = 0; j < Board.grid[i].length; j++) {
        if (Board.grid[j][i] instanceof Rook) {
          ctx.fillText("R", i * gridUnit + this.state.x, (j + 1) * gridUnit + this.state.y);
        } else if (Board.grid[j][i] instanceof Bishop) {
          ctx.fillText("B", i * gridUnit + this.state.x, (j + 1) * gridUnit + this.state.y);
        } else if (Board.grid[j][i] instanceof Pawn) {
          ctx.fillText("P", i * gridUnit + this.state.x, (j + 1) * gridUnit + this.state.y);
        }
      }
    }
  }

  componentDidMount() {

    this.canvas.current.addEventListener('mousedown', (e) => {
      this.handleClick(this.canvas.current, e)
    })

    Board.grid[8][1] = new Pawn(Board.WHITE);
    Board.grid[1][1] = new Rook(Board.BLACK);
    console.log(Board.grid);
    this.drawBoard();
  }

  handleClick(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var box = [Math.ceil((x - this.state.x) / (this.state.length / 10)), Math.ceil((y - this.state.y) / (this.state.length / 10))]
    if (x > this.state.x && x < this.state.x + this.state.length && y > this.state.y && y < this.state.y + this.state.length) {
      if (Board.grid[box[1]][box[0]] instanceof Piece && Board.grid[box[1]][box[0]].color == this.state.playerColor && this.state.turn == this.state.playerColor) {
        this.selected = box;
        this.canMoveTo = Board.grid[box[1]][box[0]].getMovement(box[0], box[1]);
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
        <canvas ref={this.canvas} className="game"></canvas>
        <button onClick={() => this.setState({playerColor: Board.WHITE })}>white</button>
        <button onClick={() => this.setState({ playerColor: Board.BLACK })}>black</button>
      </div>
    )
  }
}