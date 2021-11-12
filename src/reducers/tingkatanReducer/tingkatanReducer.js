import {
  CLEAR_TINGKATAN_DATA,
  GET_TINGKATAN_FAILURE,
  GET_TINGKATAN_REQUEST,
  GET_TINGKATAN_SUCCESS,
  POST_TINGKATAN_REQUEST,
  PUT_TINGKATAN_REQUEST,
  DEL_TINGKATAN_REQUEST,
  POST_TINGKATAN_SUCCESS,
  POST_TINGKATAN_FAILURE,
} from '../../actions';

let data = JSON.parse(localStorage.getItem('tingkatanData'));

const initialState = data
  ? {
      tingkatanData: data,
      getLoading: false,
      postLoading: false,
    }
  : {
      tingkatanData: [],
      getLoading: false,
      postLoading: false,
    };

const tingkatanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TINGKATAN_REQUEST:
      return {
        ...state,
        getLoading: true,
        postLoading: true,
      };

    case GET_TINGKATAN_SUCCESS:
      // localStorage.setItem('tingkatanData', JSON.stringify(action.payload));

      return {
        ...state,
        getLoading: false,
        postLoading: false,
        tingkatanData: action.payload,
      };

    case GET_TINGKATAN_FAILURE:
      return {
        ...state,
        getLoading: false,
        postLoading: false,
        tingkatanData: [],
      };

    case CLEAR_TINGKATAN_DATA:
      return {
        ...state,
        getLoading: false,
        postLoading: false,
        tingkatanData: [],
      };

    case POST_TINGKATAN_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case PUT_TINGKATAN_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case DEL_TINGKATAN_REQUEST:
      return {
        ...state,
        postLoading: true,
      };

    case POST_TINGKATAN_SUCCESS:
      // localStorage.setItem('tingkatanData', JSON.stringify(action.payload));

      return {
        ...state,
        postLoading: false,
        tingkatanData: action.payload,
      };

    case POST_TINGKATAN_FAILURE:
      return {
        ...state,
        postLoading: false,
        tingkatanData: [],
      };

    default:
      return state;
  }
};

export default tingkatanReducer;
