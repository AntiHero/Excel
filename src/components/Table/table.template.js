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

function createCell(content, col) {
  return (`
    <div
      class="table__cell"
      spellcheck="false"
      contenteditable="true"
      data-col="${col}"
    >
    ${content}
    </div>`
  );
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

  for (let i = 0; i < rowsCount; i++) {
    if (i === 0) {
      rows.push(createRow('', columns));
      continue;
    }
    rows.push(createRow(i, new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')));
  }

  return rows.join('');
}
