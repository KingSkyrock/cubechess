import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import * as P from './Pieces';
import Collapsible from './Collapsible.js';
//teams will be stored in local storage or maybe serverside database
export default class Teambuilder extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    this.state = {

    }
  };

  drawBoard() {
    var canvas = this.canvas.current;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var gridUnit = canvas.width / 10;

    for (var i = 0, boardX, boardY; i < 2; i++) {
      for (var j = 0; j < 10; j++) {
        boardX = j * gridUnit;
        boardY = (i + 1) * gridUnit;

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
        ctx.fillRect(boardX, i * gridUnit, gridUnit, gridUnit);
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(boardX + gridUnit / 2, i * gridUnit + gridUnit / 2, gridUnit / 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  componentDidMount() {
    this.drawBoard();
  }

  render() {
    return (
      <div>
        <canvas width="1000" height="200" onMouseDown={(e) => this.handleClick(this.canvas.current, e)} ref={this.canvas} className="teambuildercanvas"></canvas>
        <Collapsible
          name="Pawns"
          options={["Normal Pawn"]}
          optionsValues={[P.Pawn]}
        ></Collapsible>
      </div>
    )
  }
}

Teambuilder.propTypes = {
  //teamChange: PropTypes.func.isRequired,
};