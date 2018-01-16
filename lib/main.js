const DOMNodeCollection = require("./dom_node_collection");

function $l(arg, ...callbacks) {
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
}

window.$l = $l;
