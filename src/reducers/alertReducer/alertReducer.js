import { CLEAR_MESSAGE, SET_MESSAGE } from '../../actions';

const initialState = {
  message: null,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default alertReducer;
