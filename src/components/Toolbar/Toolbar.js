import {ExcelComponent} from '@/core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  static className = 'excel__toolbar';

  onClick(event) {
    console.log(event.target);
  }

  toHTML() {
    return `<div class="excel__button">
    <i class="material-icons">format_align_left</i>
  </div>
  <div class="excel__button">
    <i class="material-icons">format_align_center</i>
  </div>
  <div class="excel__button">
    <i class="material-icons">format_align_right</i>
  </div>
  <div class="excel__button">
    <i class="material-icons">format_bold</i>
  </div>
  <div class="excel__button">
    <i class="material-icons">format_italic</i>
  </div>
  <div class="excel__button">
    <i class="material-icons">format_underline</i>
  </div>`;
  }
}
