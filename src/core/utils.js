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

  root.style.setProperty('--top', top + 'px');
  root.style.setProperty('--left', left + 'px');

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

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function isEqual(a, b) {
  // if (typeof a === 'object' && typeof b === 'object') {
  //   return JSON.stringify(a) === JSON.stringify(b);
  // }

  // return a === b;
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function preventDefault(event) {
  event.preventDefault();
}
