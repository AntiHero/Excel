export class TableSelection {
  static selectedCell = 'table__cell--selected';
  static firstCell = 'table__cell--first-in-group';

  constructor() {
    this.group = [];
    this.current = null;
  }

  get selectedIds() {
    return this.group.map($el => {
      return $el.getId();
    });
  }

  // $el instanceof DOM
  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.selectedCell);
  }

  clear(isGroupSelected = false) {
    if (!isGroupSelected) {
      this.group.forEach($el => $el.removeClass(TableSelection.selectedCell));
    }
    this.group.forEach($el => $el.removeClass(TableSelection.firstCell));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear(true);
    this.group = $group;
    this.group[0].addClass(TableSelection.firstCell);
  }

  applyStyle(style) {
    this.group.forEach($el => {
      $el.css(style);
    });
  }
}
