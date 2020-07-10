import {
  TABLE_RESIZE_WIDTH,
  TABLE_RESIZE_HEIGHT,
  CHANGE_TEXT,
  APPLY_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
} from '../types';

export function tableResizeWidth(data) {
  return {
    type: TABLE_RESIZE_WIDTH,
    data,
  };
}

export function tableResizeHeight(data) {
  return {
    type: TABLE_RESIZE_HEIGHT,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function applyStyles(data) {
  return {
    type: APPLY_STYLES,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}
