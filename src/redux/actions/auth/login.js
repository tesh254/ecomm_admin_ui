import { toast } from "react-toastify";
import axios from "axios";
import history from "../../../helpers/history";
import { ERROR, LOADING, LOGIN } from "../type";

const API = process.env.REACT_APP_API;

const loginUser = data => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .post(`${API}/in`, data)
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data
      });
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/";
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

export default loginUser;
