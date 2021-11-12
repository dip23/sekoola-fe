import { SET_MESSAGE, CLEAR_MESSAGE } from './alertActionTypes';

// type : success, warning, danger
export const setMessage = (type, text, boldText) => {
  return {
    type: SET_MESSAGE,
    payload: {
      type,
      text,
      boldText,
    },
  };
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};

export const timedMessage = (type, text, boldText) => {
  return (dispatch) => {
    dispatch(setMessage(type, text, boldText && boldText));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };
};
