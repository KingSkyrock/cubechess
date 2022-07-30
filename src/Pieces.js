
export const WHITE = true;
export const BLACK = false;
export class Piece {
  constructor(color) {
    this.color = color;
    this.type;
  }
}

var connectingSides = {
  posY: { up: "negZ", down: "posZ", left: "negX", right: "posX" },
  negY: { up: "posZ", down: "negZ", left: "negX", right: "posX" }, 
  posX: { up: "posY", down: "negY", left: "posZ", right: "negZ" }, 
  negX: { up: "posY", down: "negY", left: "negZ", right: "posZ" }, 
  posZ: { up: "posY", down: "negY", left: "negX", right: "posX" }, 
  negZ: { up: "posY", down: "negY", left: "posX", right: "negX" },
}
export class Rook extends Piece {
  constructor(color) {
    super(color)
    this.type = "Rook";
    this.value = 5;
  }

  movementCalculator(dir, swapX, swapY, x, y, side, board) {
    y = parseInt(y);
    x = parseInt(x);
    if (dir == "up") {
      if (y != 0 && !board[side][y - 1][x]) {
        y--;
      } else if (y == 0 && !board[connectingSides[side].up][swapY][swapX]) {
        side = connectingSides[side].up;
        y = swapY;
        x = swapX;
      } else if (board[side][y - 1] && board[side][y - 1][x]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "down") {
      if (y != 3 && !board[side][y + 1][x]) {
        y++;
      } else if (y == 3 && !board[connectingSides[side].down][swapY][swapX]) {
        side = connectingSides[side].down;
        y = swapY;
        x = swapX;
      } else if (board[side][y + 1] && board[side][y + 1][x]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "left") {
      if (x != 0 && !board[side][y][x - 1]) {
        x--;
      } else if (x == 0 && !board[connectingSides[side].left][swapY][swapX]) {
        side = connectingSides[side].left;
        y = swapY;
        x = swapX;
      } else if (board[side][y][x - 1]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "right") {
      if (x != 3&& !board[side][y][x + 1]) {
        x++;
      } else if (x == 3 && !board[connectingSides[side].right][swapY][swapX]) {
        side = connectingSides[side].right;
        y = swapY;
        x = swapX;
      } else if (board[side][y][x + 1]) {
        return false;
      } else {
        return false;
      }
    }
    return {side: side, x: x, y: y}
  }

  getMovement(side, x, y, board) {
    var moveableCoords = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    var currentSide = side, currentX = x, currentY = y;
    while (true) { //right
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide, board);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        }
      } else {
        movement = this.movementCalculator("right", 0, currentY, currentX, currentY, currentSide, board);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
      moveableCoords[currentSide].push([currentX, currentY]);
    }
    currentSide = side, currentX = x, currentY = y;
    while (true) { //left
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide, board);
        }
      } else {
        movement = this.movementCalculator("left", 3, currentY, currentX, currentY, currentSide, board);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
      moveableCoords[currentSide].push([currentX, currentY]);
    }
    currentSide = side, currentX = x, currentY = y;
    while (true) { //up
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide, board);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide, board);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide, board);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide, board);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide, board);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide, board);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
      moveableCoords[currentSide].push([currentX, currentY]);
    }
    currentSide = side, currentX = x, currentY = y;
    while (true) { //down
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide, board);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide, board);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", 0, currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide, board);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide, board);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide, board);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide, board);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide, board);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
      moveableCoords[currentSide].push([currentX, currentY]);
    }

    return moveableCoords;
  }
}