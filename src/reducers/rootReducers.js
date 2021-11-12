import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';
import alertReducer from './alertReducer/alertReducer';
import tingkatanReducer from './tingkatanReducer/tingkatanReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  tingkatan: tingkatanReducer,
});

export default rootReducer;
