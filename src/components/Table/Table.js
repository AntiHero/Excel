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
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {ExcelStateComponent} from '@/core/ExcelStateComponent';
import {parse} from '@/core/parse';
export class Table extends ExcelStateComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this._resizedElement = null;
    this._minCellWidth = 50;
    this._minCellHeight = 24;
    this._tableSize = {height: 30, width: 26};
  }

  onClick(e) {

  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:0"]');

    this.selectCell($cell);

    this.$on('formula:input', data => {
      this.selection.current
          .attr('data-value', data);

      this.selection.current.text = parse(data);
      this.updateTextInStore(data);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:apllyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  async resizeTable(e) {
    try {
      await resizeHandler(e, this, Table);
    } catch (error) {
      console.warn('Resize error', error);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
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
        // this.selection.select($(e.target));
        this.selectCell($(e.target));
      }
    }
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    this.updateTextInStore($cell.text);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.applyStyles(styles));
  }

  onMousemove(e) {
  }

  onMouseup() {
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(this._tableSize.height, this.store.getState());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowLeft',
      'ArrowRight', 'ArrowUp', 'ArrowDown'];

    const del = 'Delete';

    const {key} = event;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.getId(true);
      const $next = this.$root.find(nextSelector(key, id, this._tableSize));
      this.selection.select($next);
      this.$emit('table:select', $next);
    } else if (del === key) {
      this.selection.current.text = '';
      this.updateTextInStore('');
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text);
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.getId(),
      value,
    }));
  }
}

// 29 msScripting
// 208 msRendering
