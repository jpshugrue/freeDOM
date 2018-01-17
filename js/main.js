const SnakeView = require('./snake-view');
const $free = require("./freeDOM");
// $(function () {
//   var rootEl = $('.snake-game');
//   new SnakeView(rootEl);
// });

$free(function () {
  const rootEl = $free('.snake-game');
  new SnakeView(rootEl);
});
