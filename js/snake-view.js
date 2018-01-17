const $free = require("./freeDOM");
const Board = require('./snake.js');

class View {

  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupGrid();

    this.KEYS = {
      38: "N",
      39: "E",
      40: "S",
      37: "W"
    };

    this.STEP_MILLIS = 100;

    this.intervalId = window.setInterval(
      this.step.bind(this),
      this.STEP_MILLIS
    );

    window.onkeydown = (event) => {
      this.handleKeyEvent(event);
    };
  }

  handleKeyEvent(event) {
    if (this.KEYS[event.keyCode]) {
      this.board.snake.turn(this.KEYS[event.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coords, className) {
    this.$li.find("." + className).removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.i * this.board.dim) + coord.j;
      // debugger
      this.$li.eq(flatCoord).addClass(className);
    }.bind(this));
  }

  setupGrid() {
    var html = "";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  }

}

module.exports = View;
