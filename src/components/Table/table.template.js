const CODES = {
  A: 65,
  Z: 90,
};

function createRow(number, content) {
  return (
    `<div class='excel__table-row' data-target="${number}">
      <div class='table__row-number'>
        ${number}
        <div class=${!number ?
          'table__row-resize--hidden' : 'table__row-resize'} 
          data-resize="row"></div>
      </div>
      <div class='table__row-data'>${content}</div>
    </div>`
  );
}

// function createCell(row, col, content) {
//   return (`
//     <div
//       class="table__cell"
//       spellcheck="false"
//       contenteditable="true"
//       data-col="${col}"
//       data-row="${row}"
//     >
//     ${content}
//     </div>`
//   );
// }

function createCell(row) {
  return function(_, col) {
    return (`
    <div
      class="table__cell"
      spellcheck="false"
      contenteditable="true"
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
    >
    ${_}
    </div>`
    );
  };
}

function createColumn(content, index) {
  return `
    <div class="table__column" data-target data-col="${index}">
      ${content}
      <div class="table__column-resize" data-resize="col"></div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 25) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = new Array(colsCount).fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  for (let row = 0; row < rowsCount; row++) {
    if (row === 0) {
      rows.push(createRow('', columns));
      continue;
    }
    rows.push(createRow(row, new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')));
  }

  return rows.join('');
}
