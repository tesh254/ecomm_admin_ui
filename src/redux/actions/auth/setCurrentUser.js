import setAuthToken from "../../../helpers/setAuthToken";
import { SET_CURRENT_USER, ERROR } from "../type";
import axios from "axios";

const API = process.env.REACT_APP_API;

// Set logged in user
export const setCurrentUser = decoded => async dispatch => {
  axios
    .get(`${API}/user/${decoded.data}`)
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwt_token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
