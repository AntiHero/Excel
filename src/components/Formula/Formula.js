import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
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
    console.log(this.$root);
    console.log('onInput formula', event.target.textContent.trim());
  }

  onClick(event) {
    console.log(event.target.textContent.trim());
  }
}
