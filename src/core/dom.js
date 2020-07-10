// dom node wrapper with additional funcionality
class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.$el = document.querySelector(selector);
    } else {
      this.$el = selector;
    }
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    /* returns serialized HTML fragment
    describing element including its descendants */
    return this.$el.outerHTML.trim();
  }

  set text(text) {
    this.$el.textContent = text;
  }

  get text() {
    console.log(this.$el.textContent, 'textcontent');
    if (this.$el.tagName.toLowerCase() === 'input') {
      console.log(this.$el.value);
      return this.$el.value.trim();
    }
    return this.$el.textContent;
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  getStyle() {
    return this.$el.style;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  getId(parse) {
    if (parse) {
      const parsed = this.getId().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  toggleClass(className) {
    this.$el.classList.contains(className) ?
      this.$el.classList.remove(className) :
      this.$el.classList.add(className);
  }

  get data() {
    return this.$el.dataset;
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
}

// function create Dom instance and returns it
export function $(selector) {
  return new Dom(selector);
}

// creates wrapped node element with selected classes
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    if (Array.isArray(classes)) {
      el.classList.add(...classes);
    } else {
      el.classList.add(classes);
    }
  }

  return $(el);
};
