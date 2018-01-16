class DOMNodeCollection {

  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callBack) {
    this.nodes.forEach(callBack);
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
          node.innerHTML += childNode.outerHTML;
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
