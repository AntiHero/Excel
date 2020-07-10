import {
  TABLE_RESIZE_WIDTH,
  TABLE_RESIZE_HEIGHT,
  CHANGE_TEXT,
  APPLY_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE_WIDTH:
      return {
        ...state,
        colState: {
          ...state.colState,
          [action.data.id]: action.data.value,
        },
      };
    case TABLE_RESIZE_HEIGHT:
      return {
        ...state,
        rowState: {
          ...state.rowState,
          [action.data.id]: action.data.value,
        },
      };
    case CHANGE_TEXT:
      field = 'dataState';

      return {...state,
        currentText: action.data.value,
        [field]: value(state, field, action)};
    case APPLY_STYLES:
      field = 'currentStyles';
      return {...state, [field]: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    case CHANGE_TITLE:
      return {...state, title: action.data};
    default: return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;

  return val;
}
