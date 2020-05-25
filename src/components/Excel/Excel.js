import {$} from '@/core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
    this.name = options.name || '';
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);

      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot().$el);
    this.components.forEach(component => component.init());
    setTimeout(() => {
      console.log('deleting');
      this.components.forEach(component => component.destroy());
    }, 10000);
  }
}

