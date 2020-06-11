export default class Emitter {
  constructor() {
    this.listeneres = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeneres[event])) {
      return false;
    }
    this.listeneres[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  subscribe(event, fn) {
    this.listeneres[event] = this.listeneres[event] || [];
    this.listeneres[event].push(fn);

    return () => {
      this.listeneres[event] =
        this.listeneres[event].filter(listener => listener !== fn);
    };
  }
}
