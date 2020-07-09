import { combineReducers } from "redux";
import cryptoReducer from "./cryptoReducer";
import oAuthReducer from "./oAuthReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  crypto: cryptoReducer,
  auth: oAuthReducer,
  user: userReducer,
  menu: menuReducer,
  form: FormReducer
});
