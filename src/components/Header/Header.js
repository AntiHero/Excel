import {ExcelComponent} from '@/core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@/core/dom';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input type="text" class="excel__title-input" value="${title}" />
    <div class="excel__button-wrapper">
      <div class="excel__button">
        <i class="material-icons">delete</i>
      </div>
      <div class="excel__button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>`;
  }

  onInput(event) {
    console.log(event.target);
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text));
  }
}
