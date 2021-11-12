// Import action types
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  CLEAR_ERROR,
} from '../../actions';

let user = JSON.parse(localStorage.getItem('userData'));

const initialState = user
  ? {
      isLogin: true,
      userData: user,
      loading: false,
      error: '',
    }
  : {
      isLogin: false,
      userData: [],
      loading: false,
      error: '',
    };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loading: false,
        userData: action.payload,
        error: '',
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
        loading: false,
        users: [],
        error: action.payload,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        loading: false,
        userData: [],
        error: '',
      };

    default:
      return state;
  }
};

export default loginReducer;
