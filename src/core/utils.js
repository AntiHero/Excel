export function capitalize(string = '') {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  return new Array(Math.abs(end - start) + 1)
      .fill(null)
      .map((_, index) => start <= end ? start + index : end + index);
}

export function getCurrentRange($target, $current) {
  const target = $target.getId(true);
  const current = $current.getId(true);

  const cols = range(current.col, target.col);

  const rows = range(current.row, target.row);

  return {cols, rows};
}

export function matrix({cols, rows}) {
  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return ids;
}

export function map({cols, rows}) {
  const mapArr = [];

  rows.forEach(row => {
    mapArr.push(cols.map(col => (`${row}:${col}`)));
  });

  return mapArr;
}

export function drawSelectedArea($selectedMap, current, target) {
  const root = document.querySelector(':root');

  const firstCellCoords = $selectedMap[0][0].getCoords();

  const top = firstCellCoords.top;
  const left = firstCellCoords.left;

  let lastCellIdx = null;
  let lastCellCoords = null;

  if ($selectedMap.length === 1) {
    lastCellIdx = $selectedMap[0].length - 1;
    lastCellCoords = $selectedMap[0][lastCellIdx].getCoords();
  } else {
    lastCellIdx = $selectedMap[$selectedMap.length - 1].length - 1;
    lastCellCoords =
      $selectedMap[$selectedMap.length - 1][lastCellIdx].getCoords();
  }

  const bottom = lastCellCoords.bottom;
  const right = lastCellCoords.right;

  const height = bottom - top;
  const width = right - left;

  const reversed =
    getSelectionDirection(current, target);

  if (!reversed) {
    root.style.setProperty('--shift', '-2px');
  } else {
    root.style.setProperty('--shift', '0');
  }

  root.style.setProperty('--width', `${width - 1}px`);
  root.style.setProperty('--height', `${height - 1}px`);
  root.style.setProperty('--display', 'block');
}

export function getSelectionDirection($target, $current) {
  const target = $target.getId(true);
  const current = $current.getId(true);

  return current.col < target.col || current.row < target.row;
}

export function nextSelector(key, {col, row}, {height, width}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      if (row + 1 < height) {
        row++;
      }
      break;
    case 'Tab':
    case 'ArrowRight':
      if (col + 1 < width) {
        col++;
      }
      break;
    case 'ArrowLeft':
      if (col - 1 >= 0) {
        col--;
      }
      break;
    case 'ArrowUp':
      if (row - 1 > 0) {
        row--;
      }
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
