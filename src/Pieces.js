
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

export class Bishop extends Piece {
  constructor(color) {
    super(color)
    this.type = "Bishop";
    this.value = 3;
  }

  movementCalculator(x, y, side, board, previousMovement) { //There is a bug where bishop wont hop sides on starting tile
    y = parseInt(y);
    x = parseInt(x);
    var movementArr = [];
    var extraMovement = [];
    
    function up(x) {
      var up = connectingSides[side].up
      var newX = x;
      if (side == "posY" && (!board[up][0][3 - newX] || board[up][0][3 - newX].color != this.color)) {
        extraMovement.push({ side: up, x: 3 - newX, y: 0 });
      } else if (side == "negY" && (!board[up][3][newX] || board[up][3][newX].color != this.color)) {
        extraMovement.push({ side: up, x: newX, y: 3 });
      } else if (side == "posZ" && (!board[up][3][newX] || board[up][3][newX].color != this.color)) {
        extraMovement.push({ side: up, x: newX, y: 3 });
      } else if (side == "posX" && (!board[up][3 - newX][3] || board[up][3 - newX][3].color != this.color)) {
        extraMovement.push({ side: up, x: 3, y: 3 - newX });
      } else if (side == "negZ" && (!board[up][0][3 - newX] || board[up][0][3 - newX].color != this.color)) {
        extraMovement.push({ side: up, x: 3 - newX, y: 0 });
      } else if (side == "negX" && (!board[up][newX][0] || board[up][newX][0].color != this.color)) {
        extraMovement.push({ side: up, x: 0, y: newX });
      }
    }

    function left(y) {
      var left = connectingSides[side].left
      var newY = y;
      if (side == "posY" && (!board[left][0][newY] || board[left][0][newY].color != this.color)) {
        extraMovement.push({ side: left, x: newY, y: 0 });
      } else if (side == "negY" && (!board[left][3][3 - newY] || board[left][3][3 - newY].color != this.color)) {
        extraMovement.push({ side: left, x: 3 - newY, y: 3 });
      } else if (side == "posZ" && (!board[left][newY][3] || board[left][newY][3].color != this.color)) {
        extraMovement.push({ side: left, x: 3, y: newY });
      } else if (side == "posX" && (!board[left][newY][3] || board[left][newY][3].color != this.color)) {
        extraMovement.push({ side: left, x: 3, y: newY });
      } else if (side == "negZ" && (!board[left][newY][3] || board[left][newY][3].color != this.color)) {
        extraMovement.push({ side: left, x: 3, y: newY });
      } else if (side == "negX" && (!board[left][newY][3] || board[left][newY][3].color != this.color)) {
        extraMovement.push({ side: left, x: 3, y: newY });
      }
    }

    function right(y) {
      var right = connectingSides[side].right
      var newY = y;
      if (side == "posY" && (!board[right][0][3 - newY] || board[right][0][3 - newY].color != this.color)) {
        extraMovement.push({ side: right, x: 3 - newY, y: 0 });
      } else if (side == "negY" && (!board[right][3][newY] || board[right][3][newY].color != this.color)) {
        extraMovement.push({ side: right, x: newY, y: 3 });
      } else if (side == "posZ" && (!board[right][newY][0] || board[right][newY][0].color != this.color)) {
        extraMovement.push({ side: right, x: 0, y: newY });
      } else if (side == "posX" && (!board[right][newY][0] || board[right][newY][0].color != this.color)) {
        extraMovement.push({ side: right, x: 0, y: newY });
      } else if (side == "negZ" && (!board[right][newY][0] || board[right][newY][0].color != this.color)) {
        extraMovement.push({ side: right, x: 0, y: newY });
      } else if (side == "negX" && (!board[right][newY][0] || board[right][newY][0].color != this.color)) {
        extraMovement.push({ side: right, x: 0, y: newY });
      }
    }

    function down(x) {
      var down = connectingSides[side].down
      var newX = x;
      if (side == "posY" && (!board[down][0][newX] || board[down][0][newX].color != this.color)) {
        extraMovement.push({ side: down, x: newX, y: 0 });
      } else if (side == "negY" && (!board[down][3][3 - newX] || board[down][3][3 - newX].color != this.color)) {
        extraMovement.push({ side: down, x: 3 - newX, y: 3 });
      } else if (side == "posZ" && (!board[down][0][newX] || board[down][0][newX].color != this.color)) {
        extraMovement.push({ side: down, x: newX, y: 0 });
      } else if (side == "posX" && (!board[down][newX][3] || board[down][newX][3].color != this.color)) {
        extraMovement.push({ side: down, x: 3, y: newX });
      } else if (side == "negZ" && (!board[down][3][3 - newX] || board[down][3][3 - newX].color != this.color)) {
        extraMovement.push({ side: down, x: 3 - newX, y: 3 });
      } else if (side == "negX" && (!board[down][3 - newX][0] || board[down][3 - newX][0].color != this.color)) {
        extraMovement.push({ side: down, x: 0, y: 3 - newX });
      }
    }

    if (y == 0) {
      () => up(x);
    }
    if (x == 0) {
      () => left(y);
    }
    if (x == 3) {
      () => right(y);
    } 
    if (y == 3) {
      () => down(x);
    }

    if (y != 0 && x != 0 && board[side][y - 1] && (!board[side][y - 1][x - 1] || board[side][y - 1][x - 1].color != this.color)) { //upleft
      var alreadyBeen = false;
      for (var coordinate of previousMovement) {
        if (coordinate[1] == y - 1 && coordinate[0] == x - 1) {
          alreadyBeen = true;
        }
      }
      if (board[side][y - 1][x - 1] && board[side][y - 1][x - 1].color != this.color) {
        extraMovement.push({ side: side, x: x - 1, y: y - 1 });
      } else if (!alreadyBeen) {
        movementArr.push([x - 1, y - 1])
        if (y - 1 == 0) {
          () => up(x - 1);
        }
        if (x - 1 == 0) {
          () => left(y - 1);
        }
      }
    }
    if (y != 0 && x != 3 && board[side][y - 1] && (!board[side][y - 1][x + 1] || board[side][y - 1][x + 1].color != this.color)) { //upright
      var alreadyBeen = false;
      for (var coordinate of previousMovement) {
        if (coordinate[1] == y - 1 && coordinate[0] == x + 1) {
          alreadyBeen = true;
        }
      }
      if (board[side][y - 1][x + 1] && board[side][y - 1][x + 1].color != this.color) {
        console.log(123)
        extraMovement.push({ side: side, x: x + 1, y: y - 1 });
      } else if (!alreadyBeen) {
        movementArr.push([x + 1, y - 1])
        if (y - 1 == 0) {
          () => up(x + 1);
        }
        if (x + 1 == 3) {
          () => right(y - 1);
        }
      }
    }
    if (y != 3 && x != 0 && board[side][y + 1] && (!board[side][y + 1][x - 1] || board[side][y + 1][x - 1].color != this.color)) { //downleft
      var alreadyBeen = false;
      for (var coordinate of previousMovement) {
        if (coordinate[1] == y + 1 && coordinate[0] == x - 1) {
          alreadyBeen = true;
        }
      }
      if (board[side][y + 1][x - 1] && board[side][y + 1][x - 1].color != this.color) {
        extraMovement.push({ side: side, x: x - 1, y: y + 1 });
      } else if (!alreadyBeen) {
        movementArr.push([x - 1, y + 1])
        if (y + 1 == 3) {
          () => down(x - 1);
        }
        if (x - 1 == 0) {
          () => left(y + 1);
        }
      }
    }
    if (y != 3 && x != 3 && board[side][y + 1] && (!board[side][y + 1][x + 1] || board[side][y + 1][x + 1].color != this.color)) { //downright
      var alreadyBeen = false;
      for (var coordinate of previousMovement) {
        if (coordinate[1] == y + 1 && coordinate[0] == x + 1) {
          alreadyBeen = true;
        }
      }
      if (board[side][y + 1][x + 1] && board[side][y + 1][x + 1].color != this.color) {
        extraMovement.push({side: side, x: x + 1, y: y + 1});
      } else if (!alreadyBeen) {
        movementArr.push([x + 1, y + 1]);
        if (y + 1 == 3) {
          () => down(x + 1);
        }
        if (x + 1 == 3) {
          () => right(y + 1);
        }
      }
    }
    return { side: side, arr: movementArr, extraMovement: extraMovement, previousMovement: previousMovement.concat(movementArr)}
  }

  getMovement(side, x, y, board) {
    var allMovement = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    function movementRecursive(movement, side, board, bishop) {
      for (var coordinate of movement.extraMovement) {
        allMovement[coordinate.side].push([coordinate.x, coordinate.y])
      }
      for (var coordinate of movement.arr) { //movement.arr should all be on the same side
        allMovement[side] = allMovement[side].concat(movement.arr)
        movementRecursive(bishop.movementCalculator(coordinate[0], coordinate[1], side, board, movement.previousMovement), side, board, bishop)
      }
    }

    var moveableCoords;
    var movement = this.movementCalculator(x, y, side, board, []);
    movementRecursive(movement, side, board, this);
    moveableCoords = allMovement;
    return moveableCoords;
  }
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
      if (y != 0 && (!board[side][y - 1][x] || board[side][y - 1][x].color != this.color)) {
        y--;
      } else if (y == 0 && (!board[connectingSides[side].up][swapY][swapX] || board[connectingSides[side].up][swapY][swapX].color != this.color)) {
        side = connectingSides[side].up;
        y = swapY;
        x = swapX;
      } else if (board[side][y - 1] && board[side][y - 1][x]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "down") {
      if (y != 3 && (!board[side][y + 1][x] || board[side][y + 1][x].color != this.color)) {
        y++;
      } else if (y == 3 && (!board[connectingSides[side].down][swapY][swapX] || board[connectingSides[side].down][swapY][swapX].color != this.color)) {
        side = connectingSides[side].down;
        y = swapY;
        x = swapX;
      } else if (board[side][y + 1] && board[side][y + 1][x]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "left") {
      if (x != 0 && (!board[side][y][x - 1] || board[side][y][x - 1].color != this.color)) {
        x--;
      } else if (x == 0 && (!board[connectingSides[side].left][swapY][swapX] || board[connectingSides[side].left][swapY][swapX].color != this.color)) {
        side = connectingSides[side].left;
        y = swapY;
        x = swapX;
      } else if (board[side][y][x - 1]) {
        return false;
      } else {
        return false;
      }
    } else if (dir == "right") {
      if (x != 3 && (!board[side][y][x + 1] || board[side][y][x + 1].color != this.color)) {
        x++;
      } else if (x == 3 && (!board[connectingSides[side].right][swapY][swapX] || board[connectingSides[side].right][swapY][swapX].color != this.color)) {
        side = connectingSides[side].right;
        y = swapY;
        x = swapX;
      } else if (board[side][y][x + 1]) {
        return false;
      } else {
        return false;
      }
    }
    if (board[side][y][x] && board[side][y][x].color != this.color) {
      return { side: side, x: x, y: y, break: true }
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
      if (movement.break) { currentX = movement.x; currentY = movement.y; currentSide = movement.side; moveableCoords[currentSide].push([currentX, currentY]); break }
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
      if (movement.break) { currentX = movement.x; currentY = movement.y; currentSide = movement.side; moveableCoords[currentSide].push([currentX, currentY]); break }
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
      if (movement.break) { currentX = movement.x; currentY = movement.y; currentSide = movement.side; moveableCoords[currentSide].push([currentX, currentY]); break }
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
      if (movement.break) { currentX = movement.x; currentY = movement.y; currentSide = movement.side; moveableCoords[currentSide].push([currentX, currentY]); break }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
      moveableCoords[currentSide].push([currentX, currentY]);
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

  getMovement(side, x, y, board) {
    var bishopMovement = new Bishop(this.color).getMovement(side, x, y, board);
    var rookMovement = new Rook(this.color).getMovement(side, x, y, board);
    var moveableCoords = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    for (var [side2, arr] of Object.entries(bishopMovement)) {
      moveableCoords[side2] = moveableCoords[side2].concat(arr)
    }
    for (var [side2, arr] of Object.entries(rookMovement)) {
      moveableCoords[side2] = moveableCoords[side2].concat(arr)
    }
    return moveableCoords;
  }
}

export class King extends Piece {
  constructor(color) {
    super(color)
    this.type = "King";
    this.value = -1;
  }

  //movement is just a modified knight, could be made a lot shorter

  movementCalculator(dir, swapX, swapY, x, y, side) {
    y = parseInt(y);
    x = parseInt(x);
    if (dir == "up") {
      if (y != 0) {
        y--;
      } else if (y == 0) {
        side = connectingSides[side].up;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "down") {
      if (y != 3) {
        y++;
      } else if (y == 3) {
        side = connectingSides[side].down;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "left") {
      if (x != 0) {
        x--;
      } else if (x == 0) {
        side = connectingSides[side].left;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "right") {
      if (x != 3) {
        x++;
      } else if (x == 3) {
        side = connectingSides[side].right;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    }
    return { side: side, x: x, y: y }
  }

  getMovement(side, x, y, board) {
    var moveableCoords = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    var currentSide = side, currentX = x, currentY = y;
    var info = { dir: null, side: null, x: null, y: null }; //dir 0 is verical, dir 1 is horizontal
    for (var i = 0; i < 2; i++) { //right
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else {
        movement = this.movementCalculator("right", 0, currentY, currentX, currentY, currentSide);
        if (i == 1) {
          info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }
    moveableCoords[info.side].push([info.x, info.y])
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 2; i++) { //left
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else {
        movement = this.movementCalculator("left", 3, currentY, currentX, currentY, currentSide);
        if (i == 1) {
          info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }
    moveableCoords[info.side].push([info.x, info.y])
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 2; i++) { //up
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }
    moveableCoords[info.side].push([info.x, info.y])
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 2; i++) { //down
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", 0, currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
          if (i == 1) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }

    moveableCoords[info.side].push([info.x, info.y])
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y, board)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }

    return moveableCoords;
  }

  calcSecondaryMovement(dir, side, x, y, board) {
    var moveableCoordsArr = [];
    var currentSide = side, currentX = x, currentY = y;

    if (dir == 1) {
      //right
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        }
      } else {
        movement = this.movementCalculator("right", 0, currentY, currentX, currentY, currentSide);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })

      //left
      currentSide = side, currentX = x, currentY = y, movement = null;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
        }
      } else {
        movement = this.movementCalculator("left", 3, currentY, currentX, currentY, currentSide);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })
    } else if (dir == 0) {
      //up
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })

      //down
      currentSide = side, currentX = x, currentY = y, movement = null;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", 0, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })
    }

    return moveableCoordsArr;
  }
}

export class Knight extends Piece {
  constructor(color) {
    super(color)
    this.type = "Knight";
    this.value = 3;
  }
  movementCalculator(dir, swapX, swapY, x, y, side) {
    y = parseInt(y);
    x = parseInt(x);
    if (dir == "up") {
      if (y != 0) {
        y--;
      } else if (y == 0) {
        side = connectingSides[side].up;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "down") {
      if (y != 3) {
        y++;
      } else if (y == 3) {
        side = connectingSides[side].down;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "left") {
      if (x != 0) {
        x--;
      } else if (x == 0) {
        side = connectingSides[side].left;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    } else if (dir == "right") {
      if (x != 3) {
        x++;
      } else if (x == 3) {
        side = connectingSides[side].right;
        y = swapY;
        x = swapX;
      } else {
        return false;
      }
    }
    return { side: side, x: x, y: y }
  }

  getMovement(side, x, y, board) {
    var moveableCoords = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    var currentSide = side, currentX = x, currentY = y;
    var info = {dir: null, side: null, x: null, y: null}; //dir 0 is verical, dir 1 is horizontal
    for (var i = 0; i < 3; i++) { //right
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else {
        movement = this.movementCalculator("right", 0, currentY, currentX, currentY, currentSide);
        if (i == 2) {
          info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }

    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 3; i++) { //left
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) { 
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else {
        movement = this.movementCalculator("left", 3, currentY, currentX, currentY, currentSide);
        if (i == 2) { 
          info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 3; i++) { //up
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }
    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }
    info = { dir: null, side: null, x: null, y: null };
    currentSide = side, currentX = x, currentY = y;
    for (var i = 0; i < 3; i++) { //down
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", 0, currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 0; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
          if (i == 2) {
            info.dir = 1; info.side = currentSide; info.x = currentX; info.y = currentY;
          }
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } else break;
    }

    for (var coordinate of this.calcSecondaryMovement(info.dir, info.side, info.x, info.y, board)) {
      moveableCoords[coordinate.side].push([coordinate.x, coordinate.y])
    }

    return moveableCoords;
  }

  calcSecondaryMovement(dir, side, x, y, board) {
    var moveableCoordsArr = [];
    var currentSide = side, currentX = x, currentY = y;
    
    if (dir == 1) {
      //right
      var movement;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        }
      } else {
        movement = this.movementCalculator("right", 0, currentY, currentX, currentY, currentSide);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side } 
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY})

      //left
      currentSide = side, currentX = x, currentY = y, movement = null;
      if (side == "posY") {
        if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negY") {
        if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", currentY, currentX, currentX, currentY, currentSide);
        }
      } else {
        movement = this.movementCalculator("left", 3, currentY, currentX, currentY, currentSide);
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })
    } else if (dir == 0) {
      //up
      var movement;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, currentX, currentX, currentY, currentSide);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("up", currentY, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })
      
      //down
      currentSide = side, currentX = x, currentY = y, movement = null;
      if (side == "posZ" || side == "posY" || side == "negY") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("down", currentX, 0, currentX, currentY, currentSide);
        }
      } else if (side == "posX") {
        if (currentSide == "posX") {
          movement = this.movementCalculator("down", 3, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("left", 3 - currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "negX") {
          movement = this.movementCalculator("up", 0, currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("right", 3 - currentY, 0, currentX, currentY, currentSide);
        }
      } else if (side == "negX") {
        if (currentSide == "negX") {
          movement = this.movementCalculator("down", 0, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "negY") {
          movement = this.movementCalculator("right", currentY, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posX") {
          movement = this.movementCalculator("up", 3, 3 - currentX, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("left", currentY, 0, currentX, currentY, currentSide);
        }
      } else if (side == "negZ") {
        if (currentSide == "negZ") {
          movement = this.movementCalculator("down", 3 - currentX, 3, currentX, currentY, currentSide);
        } else if (currentSide == "posY") {
          movement = this.movementCalculator("up", 3 - currentX, 0, currentX, currentY, currentSide);
        } else {
          movement = this.movementCalculator("up", currentX, 3, currentX, currentY, currentSide);
        }
      }
      if (movement) { currentX = movement.x; currentY = movement.y; currentSide = movement.side }
      moveableCoordsArr.push({ side: currentSide, x: currentX, y: currentY })
    }

    return moveableCoordsArr;
  }
  
}