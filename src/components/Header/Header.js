import {ExcelComponent} from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `<input type="text" class="excel__title-input" value="New table" />
    <div class="excel__button-wrapper">
      <div class="excel__button">
        <i class="material-icons">delete</i>
      </div>
      <div class="excel__button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>`;
  }
}
