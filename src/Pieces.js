import Board from "./Board";

export class Piece {
  constructor(color) { //xy on the board
    this.color = color;
    this.value;
    this.type;
  }
}

export class Rook extends Piece {
  constructor(color) {
    super(color)
    this.type = "Rook";
    this.value = 5;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    for (var i = y; true;) { //up
      i--;
      if (i >= 0) {
        if (grid[i][x] instanceof Piece && grid[i][x].color != this.color) {
          moveableCoords.push([x, i])
          break;
        } else if (grid[i][x]) break;
        moveableCoords.push([x, i])
      } else {
        break;
      }
    }
    for (var i = y; true;) { //down
      i++;
      if (i <= 7) {
        if (grid[i][x] instanceof Piece && grid[i][x].color != this.color) {
          moveableCoords.push([x, i])
          break;
        } else if (grid[i][x]) break;
        moveableCoords.push([x, i])
      } else {
        break;
      }
    }
    for (var i = x; true;) { //right
      i++;
      if (i <= 9) {
        if (grid[y][i] instanceof Piece && grid[y][i].color != this.color) {
          moveableCoords.push([i, y])
          break;
        } else if (grid[y][i]) break;
        moveableCoords.push([i, y])
      } else {
        break;
      }
    }
    for (var i = x; true;) { //right
      i--;
      if (i >= 0) {
        if (grid[y][i] instanceof Piece && grid[y][i].color != this.color) {
          moveableCoords.push([i, y])
          break;
        } else if (grid[y][i]) break;
        moveableCoords.push([i, y])
      } else {
        break;
      }
    }

    return moveableCoords;
  }
}

export class Bishop extends Piece {
  constructor(color) {
    super(color)
    this.type = "Bishop";
    this.value = 3;
  }
  getMovement(x, y, grid) {
    var moveableCoords = [];
    for (var i = y, j = x; true;) { //up left
      i--; j--;
      if (i >= 0 && j >= 0) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //down left
      i++; j--;
      if (i <= 6 && j >= 0) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //up right
      i--; j++;
      if (i >= 0 && j <= 9) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //down right
      i++; j++;
      if (i <= 7 && j <= 9) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }

    return moveableCoords;
  }
}

export class Pawn extends Piece {
  constructor(color, firstMove = true) {
    super(color)
    this.firstMove = firstMove;
    this.type = "Pawn";
    this.value = 1;
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
      if (y + 1 <= 7 && x - 1 >= 0) {
        attacking.push([x - 1, y + 1])
      }
      if (y + 1 <= 7 && x + 1 <= 9) {
        attacking.push([x + 1, y + 1])
      }
    }
    return attacking;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    if (this.color == Board.WHITE) {
      if (y - 1 >= 0 && !grid[y - 1][x]) {
        moveableCoords.push([x, y - 1])
        if (this.firstMove && y - 2 >= 0 && !grid[y - 2][x]) {
          moveableCoords.push([x, y - 2])
        }
      }
      if (y - 1 >= 0 && x - 1 >= 0 && grid[y - 1][x - 1] instanceof Piece && grid[y - 1][x - 1].color != this.color) {
        moveableCoords.push([x - 1, y - 1])
      }
      if (y - 1 >= 0 && x + 1 <= 9 && grid[y - 1][x + 1] instanceof Piece && grid[y - 1][x + 1].color != this.color) {
        moveableCoords.push([x + 1, y - 1])
      }
    } else if (this.color == Board.BLACK) {
      if (y + 1 <= 7 && !grid[y + 1][x]) {
        moveableCoords.push([x, y + 1])
        if (this.firstMove && y + 2 <= 9 && !grid[y + 2][x]) {
          moveableCoords.push([x, y + 2])
        }
      }
      if (y + 1 <= 7 && x - 1 >= 0 && grid[y + 1][x - 1] instanceof Piece && grid[y + 1][x - 1].color != this.color) {
        moveableCoords.push([x - 1, y + 1])
      }
      if (y + 1 <= 7 && x + 1 <= 9 && grid[y + 1][x + 1] instanceof Piece && grid[y + 1][x + 1].color != this.color) {
        moveableCoords.push([x + 1, y + 1])
      }
    }
    return moveableCoords;
  }
}

export class Queen extends Piece {
  constructor(color) {
    super(color)
    this.type = "Queen";
    this.value = 9;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    for (var i = y; true;) { //up
      i--;
      if (i >= 0) {
        if (grid[i][x] instanceof Piece && grid[i][x].color != this.color) {
          moveableCoords.push([x, i])
          break;
        } else if (grid[i][x]) break;
        moveableCoords.push([x, i])
      } else {
        break;
      }
    }
    for (var i = y; true;) { //down
      i++;
      if (i <= 7) {
        if (grid[i][x] instanceof Piece && grid[i][x].color != this.color) {
          moveableCoords.push([x, i])
          break;
        } else if (grid[i][x]) break;
        moveableCoords.push([x, i])
      } else {
        break;
      }
    }
    for (var i = x; true;) { //right
      i++;
      if (i <= 9) {
        if (grid[y][i] instanceof Piece && grid[y][i].color != this.color) {
          moveableCoords.push([i, y])
          break;
        } else if (grid[y][i]) break;
        moveableCoords.push([i, y])
      } else {
        break;
      }
    }
    for (var i = x; true;) { //left
      i--;
      if (i >= 0) {
        if (grid[y][i] instanceof Piece && grid[y][i].color != this.color) {
          moveableCoords.push([i, y])
          break;
        } else if (grid[y][i]) break;
        moveableCoords.push([i, y])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //up left
      i--; j--;
      if (i >= 0 && j >= 0) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //down left
      i++; j--;
      if (i <= 7 && j >= 0) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //up right
      i--; j++;
      if (i >= 0 && j <= 9) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }
    for (var i = y, j = x; true;) { //down right
      i++; j++;
      if (i <= 7 && j <= 9) {
        if (grid[i][j] instanceof Piece && grid[i][j].color != this.color) {
          moveableCoords.push([j, i])
          break;
        } else if (grid[i][j]) break;
        moveableCoords.push([j, i])
      } else {
        break;
      }
    }

    return moveableCoords;
  }
}

export class Knight extends Piece {
  constructor(color) {
    super(color)
    this.type = "Knight";
    this.value = 3;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];

    if (x - 1 >= 0 && y - 2 >= 0 && !(grid[y - 2][x - 1] instanceof Piece && grid[y - 2][x - 1].color == this.color)) { //up left
      moveableCoords.push([x - 1, y - 2])
    }
    if (x + 1 <= 9 && y - 2 >= 0 && !(grid[y - 2][x + 1] instanceof Piece && grid[y - 2][x + 1].color == this.color)) { //up right
      moveableCoords.push([x + 1, y - 2])
    }
    if (x - 1 >= 0 && y + 2 <= 7 && !(grid[y + 2][x - 1] instanceof Piece && grid[y + 2][x - 1].color == this.color)) { //down left
      moveableCoords.push([x - 1, y + 2])
    }
    if (x + 1 <= 9 && y + 2 <= 7 && !(grid[y + 2][x + 1] instanceof Piece && grid[y + 2][x + 1].color == this.color)) { //down right
      moveableCoords.push([x + 1, y + 2])
    }
    if (x - 2 >= 0 && y - 1 >= 0 && !(grid[y - 1][x - 2] instanceof Piece && grid[y - 1][x - 2].color == this.color)) { //left up
      moveableCoords.push([x - 2, y - 1])
    }
    if (x - 2 >= 0 && y + 1 <= 7 && !(grid[y + 1][x - 2] instanceof Piece && grid[y + 1][x - 2].color == this.color)) { //left down
      moveableCoords.push([x - 2, y + 1])
    }
    if (x + 2 <= 9 && y - 1 >= 0 && !(grid[y - 1][x + 2] instanceof Piece && grid[y - 1][x + 2].color == this.color)) { //right up
      moveableCoords.push([x + 2, y - 1])
    }
    if (x + 2 <= 9 && y + 1 <= 7 && !(grid[y + 1][x + 2] instanceof Piece && grid[y + 1][x + 2].color == this.color)) { //right down
      moveableCoords.push([x + 2, y + 1])
    }
    return moveableCoords;
  }
}
export class King extends Piece {
  constructor(color) {
    super(color)
    this.type = "King";
    this.value = 0;
  }

  getMovement(x, y, grid) { 
    var moveableCoords = [];
    if (x - 1 >= 0 && !(grid[y][x - 1] instanceof Piece && grid[y][x - 1].color == this.color)) { //left
      moveableCoords.push([x - 1, y])
    }
    if (x + 1 <= 9 && !(grid[y][x + 1] instanceof Piece && grid[y][x + 1].color == this.color)) { //right
      moveableCoords.push([x + 1, y])
    }
    if (y - 1 >= 0 && !(grid[y - 1][x] instanceof Piece && grid[y - 1][x].color == this.color)) { //up
      moveableCoords.push([x, y - 1])
    }
    if (y + 1 <= 7 && !(grid[y + 1][x] instanceof Piece && grid[y + 1][x].color == this.color)) { //down
      moveableCoords.push([x, y + 1])
    }
    if (x - 1 >= 0 && y - 1 >= 0 && !(grid[y - 1][x - 1] instanceof Piece && grid[y - 1][x - 1].color == this.color)) { //up left
      moveableCoords.push([x - 1, y - 1])
    }
    if (x + 1 <= 9 && y - 1 >= 0 && !(grid[y - 1][x + 1] instanceof Piece && grid[y - 1][x + 1].color == this.color)) { //up right
      moveableCoords.push([x + 1, y - 1])
    }
    if (x - 1 >= 0 && y + 1 <= 7 && !(grid[y + 1][x - 1] instanceof Piece && grid[y + 1][x - 1].color == this.color)) { //down left
      moveableCoords.push([x - 1, y + 1])
    }
    if (x + 1 <= 9 && y + 1 <= 7 && !(grid[y + 1][x + 1] instanceof Piece && grid[y + 1][x + 1].color == this.color)) { //down right
      moveableCoords.push([x + 1, y + 1])
    }
    return moveableCoords;
  }
}

//Fairies:

export class Wazir extends Piece {
  constructor(color) {
    super(color)
    this.type = "Wazir";
    this.value = 1;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    if (x - 1 >= 0 && !(grid[y][x - 1] instanceof Piece && grid[y][x - 1].color == this.color)) { //left
      moveableCoords.push([x - 1, y])
    }
    if (x + 1 <= 9 && !(grid[y][x + 1] instanceof Piece && grid[y][x + 1].color == this.color)) { //right
      moveableCoords.push([x + 1, y])
    }
    if (y - 1 >= 0 && !(grid[y - 1][x] instanceof Piece && grid[y - 1][x].color == this.color)) { //up
      moveableCoords.push([x, y - 1])
    }
    if (y + 1 <= 7 && !(grid[y + 1][x] instanceof Piece && grid[y + 1][x].color == this.color)) { //down
      moveableCoords.push([x, y + 1])
    }
    return moveableCoords;
  }
}

export class Ferz extends Piece {
  constructor(color) {
    super(color)
    this.type = "Ferz";
    this.value = 1.5;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    if (x - 1 >= 0 && y - 1 >= 0 && !(grid[y - 1][x - 1] instanceof Piece && grid[y - 1][x - 1].color == this.color)) { //up left
      moveableCoords.push([x - 1, y - 1])
    }
    if (x + 1 <= 9 && y - 1 >= 0 && !(grid[y - 1][x + 1] instanceof Piece && grid[y - 1][x + 1].color == this.color)) { //up right
      moveableCoords.push([x + 1, y - 1])
    }
    if (x - 1 >= 0 && y + 1 <= 7 && !(grid[y + 1][x - 1] instanceof Piece && grid[y + 1][x - 1].color == this.color)) { //down left
      moveableCoords.push([x - 1, y + 1])
    }
    if (x + 1 <= 9 && y + 1 <= 7 && !(grid[y + 1][x + 1] instanceof Piece && grid[y + 1][x + 1].color == this.color)) { //down right
      moveableCoords.push([x + 1, y + 1])
    }
    return moveableCoords;
  }
}

export class Mann extends Piece {
  constructor(color) {
    super(color)
    this.type = "Mann";
    this.value = 3;
  }

  getMovement(x, y, grid) {
    var moveableCoords = [];
    if (x - 1 >= 0 && !(grid[y][x - 1] instanceof Piece && grid[y][x - 1].color == this.color)) { //left
      moveableCoords.push([x - 1, y])
    }
    if (x + 1 <= 9 && !(grid[y][x + 1] instanceof Piece && grid[y][x + 1].color == this.color)) { //right
      moveableCoords.push([x + 1, y])
    }
    if (y - 1 >= 0 && !(grid[y - 1][x] instanceof Piece && grid[y - 1][x].color == this.color)) { //up
      moveableCoords.push([x, y - 1])
    }
    if (y + 1 <= 7 && !(grid[y + 1][x] instanceof Piece && grid[y + 1][x].color == this.color)) { //down
      moveableCoords.push([x, y + 1])
    }
    if (x - 1 >= 0 && y - 1 >= 0 && !(grid[y - 1][x - 1] instanceof Piece && grid[y - 1][x - 1].color == this.color)) { //up left
      moveableCoords.push([x - 1, y - 1])
    }
    if (x + 1 <= 9 && y - 1 >= 0 && !(grid[y - 1][x + 1] instanceof Piece && grid[y - 1][x + 1].color == this.color)) { //up right
      moveableCoords.push([x + 1, y - 1])
    }
    if (x - 1 >= 0 && y + 1 <= 7 && !(grid[y + 1][x - 1] instanceof Piece && grid[y + 1][x - 1].color == this.color)) { //down left
      moveableCoords.push([x - 1, y + 1])
    }
    if (x + 1 <= 9 && y + 1 <= 7 && !(grid[y + 1][x + 1] instanceof Piece && grid[y + 1][x + 1].color == this.color)) { //down right
      moveableCoords.push([x + 1, y + 1])
    }
    return moveableCoords;
  }
}