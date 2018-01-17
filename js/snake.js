class Board {

  constructor(dimensions) {
    this.dims = dimensions;
    const startingPos = Math.floor(dimensions/2);
    const startingCoord = new Coord([startingPos, startingPos]);
    this.snake = new Snake(startingCoord);
    this.apple = new Apple();
  }

}

class Snake {

  constructor(startingCoord) {
    this.direction = "N";
    this.headCoord = startingCoord;
    this.segments = [startingCoord];
  }

  move() {
    switch (this.headCoord) {
      case "N":
        this.headCoord.y -= 1;
      case "E":
        this.headCoord.x += 1;
      case "S":
        this.headCoord.y += 1;
      case "W":
        this.headCoord.x -= 1;
    }
  }

  turn(newDirec) {
    this.direction = newDirec;
  }

}

class Apple {

}

class Coord {

  constructor(coordinate) {
    this.x = coordinate[0];
    this.y = coordinate[1];
  }

  plus(coordinate) {
    const newX = this.x + coordinate[0];
    const newY = this.y + coordinate[1];
    return new Coord([newX, newY]);
  }

  equals(coordinate) {
    return (this.x === coordinate[0] && this.y === coordinate[1]);
  }

}

module.exports = Board;
