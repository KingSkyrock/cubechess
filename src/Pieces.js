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

export class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.firstMove = true;
  }

  getAttacking(x, y) {
    var attacking = [];
    if (this.color == Board.WHITE) {
      if (y - 1 >= 0 && x - 1 >= 0) {
        attacking.push([x - 1, y - 1])
      }
      if (y - 1 >= 0 && x + 1 <= 9) {
        attacking.push([x + 1, y - 1])
      }
    } else if (this.color == Board.BLACK) {
      if (y + 1 <= 9 && x - 1 >= 0) {
        attacking.push([x - 1, y + 1])
      }
      if (y + 1 <= 9 && x + 1 <= 9) {
        attacking.push([x + 1, y + 1])
      }
    }
    return attacking;
  }

  getMovement(x, y) {
    var moveableCoords = [];
    if (this.color == Board.WHITE) {
      if (y - 1 >= 0 && !Board.grid[y - 1][x]) {
        moveableCoords.push([x, y - 1])
        if (this.firstMove && y - 2 >= 0 && !Board.grid[y - 2][x]) {
          moveableCoords.push([x, y - 2])
        }
      }
      if (y - 1 >= 0 && x - 1 >= 0 && Board.grid[y - 1][x - 1] instanceof Piece && Board.grid[y - 1][x - 1].color != this.color) {
        moveableCoords.push([x - 1, y - 1])
      }
      if (y - 1 >= 0 && x + 1 <= 9 && Board.grid[y - 1][x + 1] instanceof Piece && Board.grid[y - 1][x + 1].color != this.color) {
        moveableCoords.push([x + 1, y - 1])
      }
    } else if (this.color == Board.BLACK) {
      if (y + 1 <= 9 && !Board.grid[y + 1][x]) {
        moveableCoords.push([x, y + 1])
        if (this.firstMove && y + 2 <= 9 && !Board.grid[y + 2][x]) {
          moveableCoords.push([x, y + 2])
        }
      }
      if (y + 1 <= 9 && x - 1 >= 0 && Board.grid[y + 1][x - 1] instanceof Piece && Board.grid[y + 1][x - 1].color != this.color) {
        moveableCoords.push([x - 1, y + 1])
      }
      if (y + 1 <= 9 && x + 1 <= 9 && Board.grid[y + 1][x + 1] instanceof Piece && Board.grid[y + 1][x + 1].color != this.color) {
        moveableCoords.push([x + 1, y + 1])
      }
    }
    return moveableCoords;
  }
}

export class Queen extends Piece {
  constructor(color) {
    super(color)
  }

  getMovement(x, y) {
    var moveableCoords = [];

    //bishop movement
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

    //rook movement
    i = y;
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

export class Knight extends Piece {
  constructor(color) {
    super(color)
  }

  getMovement(x, y) {
    var moveableCoords = [];

    if (x - 1 >= 0 && y - 2 >= 0 && !(Board.grid[y - 2][x - 1] instanceof Piece && Board.grid[y - 2][x - 1].color == this.color)) { //up left
      moveableCoords.push([x - 1, y - 2])
    }
    if (x + 1 <= 9 && y - 2 >= 0 && !(Board.grid[y - 2][x + 1] instanceof Piece && Board.grid[y - 2][x + 1].color == this.color)) { //up right
      moveableCoords.push([x + 1, y - 2])
    }
    if (x - 1 >= 0 && y + 2 <= 9 && !(Board.grid[y + 2][x - 1] instanceof Piece && Board.grid[y + 2][x - 1].color == this.color)) { //down left
      moveableCoords.push([x - 1, y + 2])
    }
    if (x + 1 <= 9 && y + 2 <= 9 && !(Board.grid[y + 2][x + 1] instanceof Piece && Board.grid[y + 2][x + 1].color == this.color)) { //down right
      moveableCoords.push([x + 1, y + 2])
    }
    if (x - 2 >= 0 && y - 1 >= 0 && !(Board.grid[y - 1][x - 2] instanceof Piece && Board.grid[y - 1][x - 2].color == this.color)) { //left up
      moveableCoords.push([x - 2, y - 1])
    }
    if (x - 2 >= 0 && y + 1 <= 9 && !(Board.grid[y + 1][x - 2] instanceof Piece && Board.grid[y + 1][x - 2].color == this.color)) { //left down
      moveableCoords.push([x - 2, y + 1])
    }
    if (x + 2 <= 9 && y - 1 >= 0 && !(Board.grid[y - 1][x + 2] instanceof Piece && Board.grid[y - 1][x + 2].color == this.color)) { //right up
      moveableCoords.push([x + 2, y - 1])
    }
    if (x + 2 <= 9 && y + 1 <= 9 && !(Board.grid[y + 1][x + 2] instanceof Piece && Board.grid[y + 1][x + 2].color == this.color)) { //right down
      moveableCoords.push([x + 2, y + 1])
    }
    return moveableCoords;
  }
}

export class King extends Piece {
  constructor(color) {
    super(color)
  }

  getMovement(x, y) { 
    var allAttacking = [];
    for (var i = 0; i < Board.grid.length; i++) {
      for (var j = 0; j < Board.grid[i].length; j++) {
        if (Board.grid[i][j] instanceof Piece && Board.grid[i][j].color != this.color) {
          if (Board.grid[i][j] instanceof Pawn) {
            for (var coord of Board.grid[i][j].getAttacking(j, i)) {
              allAttacking.push(coord);
            }
          } else {
            for (var coord of Board.grid[i][j].getMovement(j, i)) {
              allAttacking.push(coord);
            }
          }
        }
      }
    }
    return allAttacking;
  }
}