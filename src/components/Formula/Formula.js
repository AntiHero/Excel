import {ExcelComponent} from '@/core/ExcelComponent';
import {$} from '@/core/dom';
// import * as actions from '@/redux/actions';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  static input = 'excel__formula-input';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$input = this.$root.find(`.${Formula.input}`);

    this.$on('table:select', ($cell) => {
      console.log($cell.text);
      this.$input.text = $cell.data.value;
    });
  }

  storeChanged({currentText}) {
    this.$input.text = currentText;
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
