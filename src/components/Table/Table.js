import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '@/core/dom';
import {shouldResize, isCell} from './table.functions';
import {getCurrentRange,
  matrix,
  map,
  drawSelectedArea,
  nextSelector,
} from '@/core/utils';
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this._resizedElement = null;
    this._minCellWidth = 24;
    this._tableSize = {height: 30, width: 26};
  }

  onClick(e) {

  }

  init() {
    super.init();

    this.$on('formula:input', text => {
      this.selection.current.text = text;
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    const $cell = this.$root.find('[data-id="1:0"]');
    this.selection.select($cell);
    this.$emit('table:init', $cell);
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this, Table);
    } else if (isCell(e)) {
      if (e.shiftKey) {
        const colsAndRows =
          getCurrentRange(this.selection.current, $(e.target));
        const idsArr = matrix(colsAndRows);
        const mapArr = map(colsAndRows);

        const $selectedMap =
          mapArr.map(row => {
            return row.map(id => this.$root.find(`[data-id="${id}"]`));
          });

        drawSelectedArea($selectedMap, this.selection.current, $(e.target));

        const $selectedCells =
          idsArr.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($selectedCells);
      } else {
        this.selection.select($(e.target));
        this.selectCell($(e.target));
      }
    }
  }

  selectCell($cell) {
    this.$emit('table:select', $cell);
  }

  onMousemove(e) {
  }

  onMouseup() {
  }

  prepare() {
    this.selection = new TableSelection();
    console.log('prepared');
  }

  toHTML() {
    return createTable(this._tableSize.height);
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowLeft',
      'ArrowRight', 'ArrowUp', 'ArrowDown'];

    const {key} = event;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.getId(true);
      const $next = this.$root.find(nextSelector(key, id, this._tableSize));
      this.selection.select($next);
      this.$emit('table:select', $next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}

// 29 msScripting
// 208 msRendering
