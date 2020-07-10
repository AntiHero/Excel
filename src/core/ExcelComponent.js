import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    // this.storeSub = null;

    this.prepare();
  }

  prepare() {

  }

  // Returns component layout
  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }

  init() {
    this.initDomListener();
  }

  destroy() {
    this.unsubscribers.forEach(unsub => unsub());
    this.removeDomListener();
    // this.storeSub.unsubscribe();
  }
}
