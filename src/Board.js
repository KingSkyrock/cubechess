import React from 'react';
import './styles.scss';
import Rook from './Pieces';
import Piece from './Pieces';

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
    this.WHITE = 1;
    this.BLACK = 0;
  }

  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.selected = null;
    this.canMoveTo = [];
    this.turn = Board.WHITE;
  };

  drawBoard() {
    var canvas = this.canvas.current;
    var ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var gridUnit = canvas.width / 10;

    for (var i = 0; i < canvas.width; i += gridUnit) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.closePath();
      ctx.stroke();
      
    }
    for (var i = 0; i < canvas.height; i += gridUnit) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.closePath();
      ctx.stroke();
    }

    for (var i in this.canMoveTo) {
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.canMoveTo[i][0] * gridUnit, this.canMoveTo[i][1] * gridUnit, gridUnit, gridUnit);
      ctx.fillStyle = '#000000';
    }

    ctx.font = "100px Arial";
    for (var i = 0; i < Board.grid.length; i++) {
      for (var j = 0; j < Board.grid[i].length; j++) {
        if (Board.grid[j][i] instanceof Rook) {
          ctx.fillText("R", i * gridUnit, (j+1) * gridUnit);
        }
      }
    }
  }

  componentDidMount() {

    this.canvas.current.addEventListener('mousedown', (e) => {
      this.handleClick(this.canvas.current, e)
    })

    var rook = new Rook(Board.WHITE);
    Board.grid[8][1] = rook;
    console.log(Board.grid);
    this.drawBoard();
  }

  handleClick(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var box = [Math.ceil(x / (canvas.width / 10)) - 1, Math.ceil(y / (canvas.height / 10)) - 1]
    if (Board.grid[box[1]][box[0]] instanceof Piece && Board.grid[box[1]][box[0]].color == Board.WHITE) {
      this.selected = box;
      this.canMoveTo = Board.grid[box[1]][box[0]].getMovement(box[0], box[1]);
    } else if (this.selected != null) {
      for (var i of this.canMoveTo) {
        if (i[0] == box[0] && i[1] == box[1]) {
          Board.grid[box[1]][box[0]] = Board.grid[this.selected[1]][this.selected[0]];
          Board.grid[this.selected[1]][this.selected[0]] = null;
          this.selected = null;
          this.canMoveTo = null;
        }
      }
    }
    this.drawBoard();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvas} className="game"></canvas>
      </div>
    )
  }
}