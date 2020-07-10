import {$} from '@/core/dom';
import * as actions from '../../redux/actions';

export function resizeHandler(e, $this, Table) {
  return new Promise((resolve) => {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target);
      $resizer.getStyle().opacity = 1;
      const $table = $(document.querySelector(`.${Table.className}`));
      const tableHeight = $table.getCoords().height;
      const type = e.target.dataset.resize;

      if (type === 'col') {
        const $parent = $resizer.closest('[data-target-col]');
        const coords = $parent.getCoords();

        $resizer.getStyle().height = tableHeight + 'px';
        const cells = [
          ...$this.$root.findAll(`[data-col="${$parent.data.col}"]`),
        ];
        cells.shift();

        let delta = 0;

        document.onmousemove = (e) => {
          delta = e.pageX - coords.right;

          $parent.getStyle().width = coords.width + delta + 'px';

          $resizer.getStyle().right = delta;
        };

        let cellWidth = 0;

        document.onmouseup = (e) => {
          document.onmousemove = null;
          cellWidth = coords.width + delta < $this._minCellWidth ?
            $this._minCellWidth :
            coords.width + delta;
          cells.forEach((cell) => {
            cell.style.width = cellWidth + 'px';
          });

          $resizer.getStyle().removeProperty('right');
          $resizer.getStyle().removeProperty('opacity');
          $resizer.getStyle().removeProperty('height');

          resolve({
            isCol: true,
            value: cellWidth,
            id: $parent.data.col,
          });
        };
      } else if (type === 'row') {
        $resizer.getStyle().width = '100vw';
        const $parent = $resizer.closest('[data-target-row]');
        const coords = $parent.getCoords();

        let delta = 0;

        document.onmousemove = (e) => {
          delta = e.pageY - coords.bottom;

          $parent.getStyle().height = coords.height + delta + 'px';

          $resizer.getStyle().bottom = delta;
        };

        let cellHeight = 0;

        document.onmouseup = (e) => {
          cellHeight = coords.height + delta < $this._minCellHeight ?
              $this._minCellHeight :
              coords.height + delta;

          document.onmousemove = null;
          document.onmouseup = null;

          $resizer.getStyle().removeProperty('bottom');
          $resizer.getStyle().removeProperty('opacity');
          $resizer.getStyle().removeProperty('width');

          resolve({
            isCol: false,
            value: cellHeight,
            id: $parent.data.row,
          });
        };
      }
    }
  }).then(data => {
    if (data.isCol) {
      $this.$dispatch(actions.tableResizeWidth(data));
    } else {
      $this.$dispatch(actions.tableResizeHeight(data));
    }
  });
}
