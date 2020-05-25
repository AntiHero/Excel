import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  // Returns component layout
  toHTML() {
  }

  init() {
    this.initDomListener();
  }

  destroy() {
    this.removeDomListener();
  }
}
