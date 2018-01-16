var SnakeView = require('./snake-view');

$(function () {
  var rootEl = $('.snake-game');
  new SnakeView(rootEl);
});
