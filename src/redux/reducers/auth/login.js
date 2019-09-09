import {
  ERROR,
  LOADING,
  LOGIN,
  SET_CURRENT_USER,
  EMAIL,
  RESET
} from "../../actions/type";
import isEmpty from "../../../validation/is-empty";

let initialState = {
  error: "",
  token: "",
  refreshToken: "",
  message: "",
  isLoggedIn: false,
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload.user
      };
    case EMAIL:
      return {
        ...state,
        message: action.payload.message
      };
    case RESET:
      return {
        ...state,
        message: action.payload.message
      };
    case LOGIN:
      let token;
      let refreshToken;

      token = action.payload.token;
      refreshToken = action.payload.refresh_token;
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      return {
        ...state,
        token,
        refreshToken,
        isLoggedIn: true,
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
    default:
      return state;
  }
};

export default loginReducer;
