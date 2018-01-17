class Board {

  constructor() {
    this.snake = new Snake([0,0]);
    this.apple = new Apple();
  }

}

class Snake {

  constructor(startingPos) {
    this.direction = "N";
    this.headPos = startingPos;
    this.segments = [];
  }

  move() {
    switch (this.headPos) {
      case "N":
        this.headPos[1] -= 1;
      case "E":
        this.headPos[0] += 1;
      case "S":
        this.headPos[1] += 1;
      case "W":
        this.headPos[0] -= 1;
    }
  }

  turn(newDirec) {
    this.direction = newDirec;
  }

}

class Apple {

}

class Coord {

}

module.exports = Board;
