// Auth Actions
import axios from 'axios';
import { clearTingkatanData } from '..';
import { loginApi, registSekolahApi } from '../../configs/api/endpoints';
// Import Action Types
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  CLEAR_ERROR,
} from './authActionTypes';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (userData = []) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const registRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registFailure = (err) => {
  return {
    type: REGISTER_FAILURE,
    payload: err,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginUser = (dataUser) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    let request;

    await axios
      .post(loginApi, JSON.stringify(dataUser), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const userData = res.data.content;
        dispatch(loginSuccess(userData));
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(localStorage.getItem('userData')); // for debugging

        request = 'success';
      })
      // Notes*
      // gada koneksi: err.message = "Network Error", err.response = undefined
      // Login salah email/pass : err.response .statusText = 'Unauthorized' .status = 401, err.response.data.message = 'Unauthorized'
      // sisanya Bad Request 401 (validasi form dari BE)
      .catch((err) => {
        const res = err.response;
        if (res) {
          if (res.data.message === 'Unauthorized') {
            return dispatch(
              loginFailure('Your email or password is incorrect')
            );
          }
          dispatch(loginFailure(res.data.message));
        } else {
          dispatch(loginFailure(err.message));
        }
      });

    return request;
  };
};

export const registerUserSekolah = (dataUser) => {
  return async (dispatch) => {
    dispatch(registRequest());

    let request;
    await axios
      .post(registSekolahApi, JSON.stringify(dataUser), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        dispatch(registSuccess());
        request = 'success';
      })
      // Notes*
      // gada koneksi: err.message = "Network Error", err.response = undefined
      // Regist email existed : err.response .statusText = 'Internal Server Error' .status = 500, err.response.data = tanya nazmi
      // sisanya Bad Request 401 (validasi form dari BE, lewat err.response.data.message)
      .catch((err) => {
        const res = err.response;
        request = 'failed';
        if (res) {
          dispatch(registFailure(res.data.message));
        } else {
          dispatch(registFailure(err.message));
        }
      });

    return request;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.clear();
    dispatch(clearTingkatanData());
    dispatch(logoutSuccess());

    // const request = axios.post(loginApi, JSON.stringify(dataUser), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // return request;
  };
};
