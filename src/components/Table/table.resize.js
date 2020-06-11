import {$} from '@/core/dom';

export function resizeHandler(e, $this, Table) {
  if (e.target.dataset.resize) {
    const $resizer = $(e.target);
    const $parent = $resizer.closest('[data-target]');
    const coords = $parent.getCoords();
    $resizer.getStyle().opacity = 1;
    const $table = $(document.querySelector(`.${Table.className}`));
    const tableHeight = $table.getCoords().height;

    if (e.target.dataset.resize === 'col') {
      $resizer.getStyle().height = tableHeight + 'px';
      const cells =
        [...$this.$root.findAll(`[data-col="${$parent
            .data.col}"]`)];
      cells.shift();

      let delta = 0;

      document.onmousemove = e => {
        delta = e.pageX - coords.right;

        $parent.getStyle().width = coords.width + delta + 'px';

        $resizer.getStyle().right = delta;
      };

      document.onmouseup = e => {
        document.onmousemove = null;
        cells.forEach(cell => {
          cell.style.width =
            (coords.width + delta < 0 ?
              $this._minCellWidth : coords.width + delta) + 'px';
        });

        $resizer.getStyle().removeProperty('right');
        $resizer.getStyle().removeProperty('opacity');
        $resizer.getStyle().removeProperty('height');
      };
    } else if (e.target.dataset.resize === 'row') {
      $resizer.getStyle().width = '100vw';

      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom;

        $parent.getStyle().height = coords.height + delta + 'px';

        $resizer.getStyle().bottom = delta;
      };

      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.getStyle().removeProperty('bottom');
        $resizer.getStyle().removeProperty('opacity');
        $resizer.getStyle().removeProperty('width');
      };
    }
  }
}
