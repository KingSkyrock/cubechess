import React from 'react';
import './styles.scss';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.grid = Array(2).fill(Array(4));

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
      ctx.stroke();
    }
    for (var i = 0; i < canvas.height; i += gridUnit) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }

  componentDidMount() {
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