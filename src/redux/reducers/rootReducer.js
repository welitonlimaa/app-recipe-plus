import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import dataApiReducer from './dataApiReducer';

const rootReducer = combineReducers({
  loginReducer,
  dataApiReducer,
});

export default rootReducer;
