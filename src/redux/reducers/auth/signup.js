import { ERROR, LOADING, SIGNUP, VERIFY } from "../../actions/type";
import isEmpty from "../../../validation/is-empty";

let initialState = {
  error: "",
  message: "",
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SIGNUP:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    case ERROR:
      return {
        error: action.payload.message,
        isLoggedIn: false,
        token: null,
        refreshToken: null
      };
    case VERIFY:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default signupReducer;
