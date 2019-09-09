import { toast } from "react-toastify";
import axios from "axios";
import history from "../../../helpers/history";
import { ERROR, LOADING, SIGNUP } from "../type";

const API = process.env.REACT_APP_API;

const signupUser = data => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .post(`${API}/join`, data)
    .then(res => {
      dispatch({
        type: SIGNUP,
        payload: res.data
      });
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/verify";
      }, 1000);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

export default signupUser;
