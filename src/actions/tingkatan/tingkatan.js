// Auth Actions
import axios from 'axios';
import { tingkatanApi } from '../../configs';
// Import Action Types
import {
  GET_TINGKATAN_REQUEST,
  GET_TINGKATAN_SUCCESS,
  GET_TINGKATAN_FAILURE,
  CLEAR_TINGKATAN_DATA,
  POST_TINGKATAN_REQUEST,
  PUT_TINGKATAN_REQUEST,
  DEL_TINGKATAN_REQUEST,
  POST_TINGKATAN_SUCCESS,
  POST_TINGKATAN_FAILURE,
} from './tingkatanActionTypes';

export const getTingkatanRequest = () => {
  return {
    type: GET_TINGKATAN_REQUEST,
  };
};

export const getTingkatanSuccess = (tingkatanData = []) => {
  return {
    type: GET_TINGKATAN_SUCCESS,
    payload: tingkatanData,
  };
};

export const getTingkatanFailure = () => {
  return {
    type: GET_TINGKATAN_FAILURE,
  };
};

export const clearTingkatanData = () => {
  return {
    type: CLEAR_TINGKATAN_DATA,
  };
};

export const postTingkatanRequest = () => {
  return {
    type: POST_TINGKATAN_REQUEST,
  };
};

export const putTingkatanRequest = () => {
  return {
    type: PUT_TINGKATAN_REQUEST,
  };
};

export const delTingkatanRequest = () => {
  return {
    type: DEL_TINGKATAN_REQUEST,
  };
};

export const postTingkatanSuccess = (newData) => {
  return {
    type: POST_TINGKATAN_SUCCESS,
    payload: newData,
  };
};

export const postTingkatanFailure = (err) => {
  return {
    type: POST_TINGKATAN_FAILURE,
    payload: err,
  };
};

export const getDataTingkatan = (token, source) => {
  return async (dispatch) => {
    dispatch(getTingkatanRequest());
    let request;

    //* Adi's new way
    try {
      const response = await axios.get(tingkatanApi, {
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        cancelToken: source.token,
      });
      const tingkatanData = response.data.content.grades;
      dispatch(getTingkatanSuccess(tingkatanData));
      // localStorage.setItem('tingkatanData', JSON.stringify(tingkatanData));
      request = 'success';
    } catch (error) {
      // stackOverFlow
      request = 'failed';
      dispatch(getTingkatanFailure());
      if (axios.isCancel(error)) {
        console.log(`request cancelled: ${error}`);
      } else {
        console.log('another error happened');
        console.log(error.message);
      }
    }

    //* Adi's old way
    // await axios
    //   .get(tingkatanApi, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       auth: token,
    //     },
    //     cancelToken: source.token,
    //   })
    //   .then((res) => {
    //     const tingkatanData = res.data.content.grades;
    //     dispatch(getTingkatanSuccess(tingkatanData));
    //     localStorage.setItem('tingkatanData', JSON.stringify(tingkatanData));
    //     request = 'success';
    //   })
    //   .catch((err) => {
    //     dispatch(getTingkatanFailure());
    //     // stackOverFlow
    //     if (axios.isCancel(err)) {
    //       console.log(`request cancelled:${err}`);
    //     } else {
    //       console.log('another error happened');
    //       console.log(err.message);
    //     }
    //   });

    return request;
  };
};

export const postDataTingkatan = (dataForm, token) => {
  return async (dispatch, getState) => {
    dispatch(postTingkatanRequest());

    let request;
    await axios
      .post(tingkatanApi, JSON.stringify(dataForm), {
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
      })
      .then((res) => {
        const newData = res.data.content;
        const state = getState();
        const oldTingkatanData = state.tingkatan.tingkatanData;

        oldTingkatanData.push(newData);
        dispatch(postTingkatanSuccess([...oldTingkatanData]));
        request = 'success';
      })
      .catch((err) => {
        const res = err.response;
        request = 'failed';
        if (res) {
          dispatch(postTingkatanFailure());
        } else {
          dispatch(postTingkatanFailure());
        }
      });

    return request;
  };
};
