export class Piece {
  constructor(color) {
    this.color = color;
    this.type;
  }
}

var connectingSides = {
                        posY: { up: "negX", down: "posX", left: "posZ", right: "negZ" },
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

  getMovement(side, x, y, board) {
    var moveableCoords = { posY: [], negY: [], posX: [], negX: [], posZ: [], negZ: [], };
    for (var currentSide = side, currentX = x, currentY = y; true;) { //right
      if (side == "posY") {
        if (currentSide == "posY") {
          if (currentX != 3 && !board[currentSide][currentY][currentX + 1]) {
            currentX++;
            moveableCoords[currentSide].push([currentX, currentY]);
          } else if (currentX == 3) {
            currentSide = connectingSides[currentSide].right;
            currentX = 3 - currentY;
            currentY = 0;
            moveableCoords[currentSide].push([currentX, currentY]);
          }
        } else if (currentSide == "negZ") {
          if (currentY != 3 && !board[currentSide][currentY + 1][currentX]) {

          } else if (currentY == 3) {
            
          }
        }
        
      } else if (side == "negY") {

      } else {
        if (currentX != 3 && !board[currentSide][currentY][currentX + 1]) {
          currentX++;
          moveableCoords[currentSide].push([currentX, currentY]);
        } else if (currentX == 3 && !board[connectingSides[currentSide].right][currentY][0]) {
          currentSide = connectingSides[currentSide].right;
          currentX = 0;
          moveableCoords[currentSide].push([currentX, currentY]);
        } else if (board[currentSide][currentY][currentX + 1]) {
          break; //will then also detect if that piece is capturable
        } else {
          break;
        }
      }
      
    }
    return moveableCoords;
  }
}