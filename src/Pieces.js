import Board from "./Board";

class Piece {
  constructor(color) { //xy on the board
    this.color = color;
  }
}

export default class Rook extends Piece {
  constructor(color) { //xy on the board
    super(color)
  }

  getMovement(x, y) {
    var moveableCoords = [];
    var i = y;
    while (i - 1 >= 0 && !Board.grid[i - 1][x]) { //up
      i--;
      moveableCoords.push([x, i])
    }
    i = y;
    while (i + 1 <= 9 && !Board.grid[i + 1][x]) { //down
      i++;
      moveableCoords.push([x, i])
    }
    i = x;
    while (i - 1 >= 0 && !Board.grid[y][i - 1]) { //left
      i--;
      moveableCoords.push([i, y])

    }
    i = x;
    while (i + 1 <= 9 && !Board.grid[y][i + 1]) { //right
      i++;
      moveableCoords.push([i, y])
    }

    return moveableCoords;
  }
}