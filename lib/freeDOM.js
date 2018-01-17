const DOMNodeCollection = require("./dom_node_collection");

function $free(arg, ...callbacks) {
  const whenLoaded = function(){
    if (typeof arg === "function") {
      arg();
    }
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
  } else if (typeof arg === "string") {
    const nodeList = document.querySelectorAll(arg);
    const nodes = Array.from(nodeList);
    return new DOMNodeCollection(nodes);
  }
}

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

window.$free = $free;
