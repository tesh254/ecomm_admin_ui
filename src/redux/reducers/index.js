import { combineReducers } from "redux";
import loginReducer from "../reducers/auth/login";
import signupReducer from "../reducers/auth/signup";
import productsReducer from "./products";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  products: productsReducer
});

export default rootReducer;
