/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var SnakeView = __webpack_require__(1);

$(function () {
  var rootEl = $('.snake-game');
  new SnakeView(rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const $free = __webpack_require__(2);

var Board = __webpack_require__(4);

var View = function ($el) {
  this.$el = $el;

  this.board = new Board(20);
  this.setupGrid();

  this.intervalId = window.setInterval(
    this.step.bind(this),
    View.STEP_MILLIS
  );

  $(window).on("keydown", this.handleKeyEvent.bind(this));
};

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_MILLIS = 100;

View.prototype.handleKeyEvent = function (event) {
  if (View.KEYS[event.keyCode]) {
    this.board.snake.turn(View.KEYS[event.keyCode]);
  } else {
    // some other key was pressed; ignore.
  }
};

View.prototype.render = function () {
  // simple text based rendering
  // this.$el.html(this.board.render());

  this.updateClasses(this.board.snake.segments, "snake");
  this.updateClasses([this.board.apple.position], "apple");
};

View.prototype.updateClasses = function(coords, className) {
  this.$li.filter("." + className).removeClass();

  coords.forEach(function(coord){
    var flatCoord = (coord.i * this.board.dim) + coord.j;
    this.$li.eq(flatCoord).addClass(className);
  }.bind(this));
};

View.prototype.setupGrid = function () {
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
};

View.prototype.step = function () {
  if (this.board.snake.segments.length > 0) {
    this.board.snake.move();
    this.render();
  } else {
    alert("You lose!");
    window.clearInterval(this.intervalId);
  }
};

module.exports = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(3);

const $free = function(arg, ...callbacks) {
  const whenLoaded = function(){
    callbacks.forEach ( (func) => {
      func();
    });
  };

  if (document.readyState === "complete") {
    whenLoaded();
  } else {
    document.addEventListener("DOMContentLoaded", whenLoaded);
  }

  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else {
    const nodeList = document.querySelectorAll(arg);
    const nodes = Array.from(nodeList);
    return new DOMNodeCollection(nodes);
  }
};

$free.extend = function(mainObj, ...otherObjs) {
  otherObjs.forEach ((obj) => {
    Object.keys(obj).forEach ((key) => {
      mainObj[key] = obj[key];
    });
  });
};

$free.ajax = function(options) {
  const defaults = {
    url: "",
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: () => {},
    error: () => {},
    data: {}
  };
  $free.extend(defaults, options);
  const request = new XMLHttpRequest();
  request.open(defaults.method, defaults.url);
  request.onload = function () {
    if (request.status === 200) {
      defaults.success(request.response);
    } else {
      defaults.error(request.response);
    }
  };
  request.send(JSON.stringify(defaults.data));
};

module.exports = $free;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callBack) {
    this.nodes.forEach(callBack);
  }

  on(eventType, action) {
    this.each((node) => {
      node.addEventListener(eventType, action);
      node.eventType = action;
    });
  }

  off(eventType) {
    this.each((node) => {
      node.removeEventListener(eventType, node.eventType);
      node.eventType = undefined;
    });
  }

  html(arg) {
    if (typeof arg === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      this.each((node) => {
        node.innerHTML = arg;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(content) {
    if (typeof content === "string") {
      this.each((node) => {
        node.innerHTML += content;
      });
    } else if (content instanceof (HTMLElement)) {
      this.each((node) => {
        node.innerHTML += content.outerHTML;
      });
    } else {
      this.each((node) => {
        content.each((childNode) => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr(attrName) {
    return this.nodes[0].getAttribute(attrName);
  }

  addClass(newClass) {
    this.each((node) => {
      node.classList.add(newClass);
    });
  }

  removeClass(oldClass) {
    this.each((node) => {
      node.classList.remove(oldClass);
    });
  }

  children() {
    let children = [];
    this.each((node) => {
      children.push(Array.from(node.children));
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.each((node) => {
      if (!parents.includes(node.parentElement)) {
        parents.push(node.parentElement);
      }
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let foundArr = [];
    this.each((node) => {
      foundArr.push(node.querySelectorAll(selector));
    });
    return new DOMNodeCollection(foundArr);
  }

  remove() {
    this.empty();
    this.nodes = [];
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Coord = function (i, j) {
  this.i = i;
  this.j = j;
};

Coord.prototype.equals = function (coord2) {
  return (this.i == coord2.i) && (this.j == coord2.j);
};

Coord.prototype.isOpposite = function (coord2) {
  return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
};

Coord.prototype.plus = function (coord2) {
  return new Coord(this.i + coord2.i, this.j + coord2.j);
};

var Apple = function (board) {
  this.board = board;
  this.replace();
};

Apple.prototype.replace = function () {
  var x = Math.floor(Math.random() * this.board.dim);
  var y = Math.floor(Math.random() * this.board.dim);

  // Don't place an apple where there is a snake
  while (this.board.snake.isOccupying([x, y])) {
    x = Math.floor(Math.random() * this.board.dim);
    y = Math.floor(Math.random() * this.board.dim);
  }

  this.position = new Coord(x, y);
};

var Snake = function (board) {
  this.dir = "N";
  this.turning = false;
  this.board = board;

  var center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
  this.segments = [center];

  this.growTurns = 0;
};

Snake.DIFFS = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

Snake.SYMBOL = "S";
Snake.GROW_TURNS = 3;

Snake.prototype.eatApple = function () {
  if (this.head().equals(this.board.apple.position)) {
    this.growTurns += 3;
    return true;
  } else {
    return false;
  }
};

Snake.prototype.isOccupying = function (array) {
  var result = false;
  this.segments.forEach(function (segment) {
    if (segment.i === array[0] && segment.j === array[1]) {
      result = true;
      return result;
    }
  });
  return result;
};

Snake.prototype.head = function () {
  return this.segments[this.segments.length - 1];
};

Snake.prototype.isValid = function () {
  var head = this.head();

  if (!this.board.validPosition(this.head())) {
    return false;
  }

  for (var i = 0; i < this.segments.length - 1; i++) {
    if (this.segments[i].equals(head)) {
      return false;
    }
  }

  return true;
};

Snake.prototype.move = function () {
  // move snake forward
  this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

  // allow turning again
  this.turning = false;

  // maybe eat an apple
  if (this.eatApple()) {
    this.board.apple.replace();
  }

  // if not growing, remove tail segment
  if (this.growTurns > 0) {
    this.growTurns -= 1;
  } else {
    this.segments.shift();
  }

  // destroy snake if it eats itself or runs off grid
  if (!this.isValid()) {
    this.segments = [];
  }
};

Snake.prototype.turn = function (dir) {
  // avoid turning directly back on yourself
  if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
    this.turning) {
    return;
  } else {
    this.turning = true;
    this.dir = dir;
  }
};

var Board = function (dim) {
  this.dim = dim;

  this.snake = new Snake(this);
  this.apple = new Apple(this);
};

Board.BLANK_SYMBOL = ".";

Board.blankGrid = function (dim) {
  var grid = [];

  for (var i = 0; i < dim; i++) {
    var row = [];
    for (var j = 0; j < dim; j++) {
      row.push(Board.BLANK_SYMBOL);
    }
    grid.push(row);
  }

  return grid;
};

Board.prototype.render = function () {
  var grid = Board.blankGrid(this.dim);

  this.snake.segments.forEach(function (segment) {
    grid[segment.i][segment.j] = Snake.SYMBOL;
  });

  grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;

  // join it up
  var rowStrs = [];
  grid.map(function (row) {
    return row.join("");
  }).join("\n");
};

Board.prototype.validPosition = function (coord) {
  return (coord.i >= 0) && (coord.i < this.dim) &&
    (coord.j >= 0) && (coord.j < this.dim);
};

module.exports = Board;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map