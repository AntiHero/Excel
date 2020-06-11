import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/dom';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  static input = 'excel__formula-input';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$input = this.$root.find(`.${Formula.input}`);

    this.$on('table:select', ($cell) => {
      this.$input.text = $cell.text;
    });

    this.$on('table:input', ($cell) => {
      this.$input.text = $cell.text;
    });

    this.$on('table:init', ($cell) => {
      this.$input.text = $cell.text;
    });
  }

  toHTML() {
    return `<div class="excel__formula-logo">
    <i class="material-icons">functions</i>
  </div>
  <div
    contenteditable="true"
    spellcheck="false"
    class="excel__formula-input"
  ></div>`;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
