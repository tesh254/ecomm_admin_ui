import { toast } from "react-toastify";
import axios from "axios";
import { ERROR, VERIFY, LOADING, LOGIN } from "../type";

const API = process.env.REACT_APP_API;

const verifyUser = token => async dispatch => {
    dispatch({
        type: LOADING
    })
    axios
        .put(`${API}/email-verify/${token}`)
        .then(res => {
            dispatch({
                type: LOGIN,
                payload: res.data
            })
            toast.success(res.data.message)
        })
        .catch(err => {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            toast.error(err.response.data.message);
        })
} 

export default verifyUser;
