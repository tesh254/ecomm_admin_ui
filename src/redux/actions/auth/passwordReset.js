import { toast } from "react-toastify";
import axios from "axios";
import history from "../../../helpers/history";
import { ERROR, EMAIL, RESET, LOADING } from "../type";

const API = process.env.REACT_APP_API;

export const passwordResetRequest = data => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .post(`${API}/password-reset/email`, data)
    .then(res => {
      dispatch({
        type: EMAIL,
        payload: res.data
      });
      toast.success(res.data.message);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

export const handlePasswordReset = (token, data) => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .put(`${API}/password-reset/${token}`, data)
    .then(res => {
      dispatch({
        type: RESET,
        payload: res.data
      });
      toast.success(res.data.message);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};
