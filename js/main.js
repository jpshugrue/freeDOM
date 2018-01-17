const SnakeView = require('./snake-view');
const $free = require("./freeDOM");

$free(function () {
  const rootEl = $free('.snake-game');
  new SnakeView(rootEl);
});
