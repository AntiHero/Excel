import {createToolbar} from './toolbar.template';
import {$} from '@/core/dom';
import {ExcelStateComponent} from '@/core/ExcelStateComponent';
import {defaultStyles} from '@/constants';
// import * as actions from '@/redux/actions';
export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:apllyStyle', value);
    }
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  toHTML() {
    return this.template;
  }
}
