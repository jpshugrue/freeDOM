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

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
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
      const nodeList = node.querySelectorAll(selector);
      foundArr = foundArr.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(foundArr);
  }

  remove() {
    this.empty();
    this.nodes = [];
  }

  eq(index) {
    let foundEl = [];
    foundEl = [this.nodes[index]];
    return new DOMNodeCollection(foundEl);
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map