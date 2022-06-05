import Board from "./Board";

export class Piece {
  constructor(color) { //xy on the board
    this.color = color;
  }
}

export class Rook extends Piece {
  constructor(color) {
    super(color)
  }

  getMovement(x, y) {
    var moveableCoords = [];
    var i = y;
    while (i - 1 >= 0 && !Board.grid[i - 1][x]) { //up
      i--;
      moveableCoords.push([x, i])
      if (i - 1 >= 0 && Board.grid[i - 1][x] instanceof Piece && Board.grid[i - 1][x].color != this.color)
        moveableCoords.push([x, i - 1]) 
    }
    i = y;
    while (i + 1 <= 9 && !Board.grid[i + 1][x]) { //down
      i++;
      moveableCoords.push([x, i])
      if (i + 1 <= 9 && Board.grid[i + 1][x] instanceof Piece && Board.grid[i + 1][x].color != this.color)
        moveableCoords.push([x, i + 1]) 
    }
    i = x;
    while (i - 1 >= 0 && !Board.grid[y][i - 1]) { //left
      i--;
      moveableCoords.push([i, y])
      if (i - 1 >= 0 && Board.grid[y][i - 1] instanceof Piece && Board.grid[y][i - 1].color != this.color)
        moveableCoords.push([i - 1, y])
    }
    i = x;
    while (i + 1 <= 9 && !Board.grid[y][i + 1]) { //right
      i++;
      moveableCoords.push([i, y])
      if (i + 1 <= 9 && Board.grid[y][i + 1] instanceof Piece && Board.grid[y][i + 1].color != this.color)
        moveableCoords.push([i + 1, y])
    }

    return moveableCoords;
  }
}

export class Bishop extends Piece {
  constructor(color) {
    super(color)
  }
  getMovement(x, y) {
    var moveableCoords = [];
    var i = y;
    var j = x;
    while (i - 1 >= 0 && j - 1 >= 0 && !Board.grid[i - 1][j - 1]) { //up left
      i--;
      j--;
      moveableCoords.push([j, i])
      if (i - 1 >= 0 && j - 1 >= 0 && Board.grid[i - 1][j - 1] instanceof Piece && Board.grid[i - 1][j - 1].color != this.color)
        moveableCoords.push([j - 1, i - 1])
    }
    i = y;
    j = x;
    while (i + 1 <= 9 && j - 1 >= 0 && !Board.grid[i + 1][j - 1]) { //down left
      i++;
      j--;
      moveableCoords.push([j, i])
      if (i + 1 <= 9 && j - 1 >= 0 && Board.grid[i + 1][j - 1] instanceof Piece && Board.grid[i + 1][j - 1].color != this.color)
        moveableCoords.push([j - 1, i + 1])
    }
    i = y;
    j = x;
    while (i - 1 >= 0 && j + 1 <= 9 && !Board.grid[i - 1][j + 1]) { //up right
      i--;
      j++;
      moveableCoords.push([j, i])
      if (i - 1 >= 0 && j + 1 <= 9 && Board.grid[i - 1][j + 1] instanceof Piece && Board.grid[i - 1][j + 1].color != this.color)
        moveableCoords.push([j + 1, i - 1])
    }
    i = y;
    j = x;
    while (i + 1 <= 9 && j + 1 <= 9 && !Board.grid[i + 1][j + 1]) { //down right
      i++;
      j++;
      moveableCoords.push([j, i])
      if (i + 1 <= 9 && j + 1 <= 9 && Board.grid[i + 1][j + 1] instanceof Piece && Board.grid[i + 1][j + 1].color != this.color)
        moveableCoords.push([j + 1, i + 1])
    }

    return moveableCoords;
  }
}