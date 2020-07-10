import {toInlineStyles} from '@/core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@/core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const DEFAULT_DATA = '';

function getWidth(state, index) {
  if (state === undefined) return DEFAULT_WIDTH + 'px';
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  if (state === undefined) return DEFAULT_HEIGHT + 'px';
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function getData(state, row, col) {
  return state[`${row}:${col}`] || DEFAULT_DATA;
}

function createRow(state, number, content) {
  return (
    `<div 
      class='excel__table-row' 
      data-target 
      data-target-row 
      data-row="${number}"
      style="height: ${getHeight(state.rowState, number)}"
      >
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

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return (`
    <div
      class="table__cell"
      spellcheck="false"
      contenteditable="true"
      data-type="cell"
      data-col="${col}"
      data-row="${row}"
      data-id="${id}"
      data-value="${state.dataState || ''}"
      style="${styles}; width: ${getWidth(state.colState, col)}"
    >
      ${parse(getData(state.dataState, row, col))}
    </div>`
    );
  };
}

function createColumn({col, index, width}) {
  return `
    <div 
      class="table__column" 
      data-target 
      data-target-col
      data-col="${index}" 
      style="width: ${width}">
      ${col}
      <div class="table__column-resize" data-resize="col"></div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 25, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = new Array(colsCount).fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('');

  for (let row = 0; row < rowsCount; row++) {
    if (row === 0) {
      rows.push(createRow(state, '', columns));
      continue;
    }
    rows.push(createRow(state, row, new Array(colsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')));
  }

  return rows.join('');
}
