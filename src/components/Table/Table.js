import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
    this._resizedElement = null;
    this._minCellWidth = 24;
  }

  onClick() {
    console.log('click');
  }

  onMousedown(e) {
    resizeHandler(e, this, Table);
  }

  onMousemove(e) {
  }

  onMouseup() {
  }

  toHTML() {
    return createTable(30);
  }
}


// 29 msScripting
// 208 msRendering
