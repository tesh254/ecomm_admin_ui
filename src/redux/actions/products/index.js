import axios from "axios";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  LOADING,
  ERROR,
  ADD_PRODUCT,
  FETCH_CATEGORIES,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from "../type";
import { toast } from "react-toastify";
import history from "../../../helpers/history";

const API = process.env.REACT_APP_API;

export const fetchProducts = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios.get(`${API}/products`).then(res => {
    dispatch({
      type: FETCH_PRODUCTS,
      payload: res.data
    });
  });
};
export const fetchProduct = product_id => async dispatch => {
  dispatch({
    type: LOADING
  });

  axios
    .get(`${API}/products/${product_id}`)
    .then(res => {
      dispatch({
        type: FETCH_PRODUCT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

export const addProduct = data => async dispatch => {
  dispatch({
    type: LOADING
  });

  axios
    .post(`${API}/products`, data)
    .then(res => {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      });
      toast.success(res.data.message)
      window.location.href = `/products/${res.data.product._id}`;
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};

export const fetchProductsByCategory = category_name => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .get(`${API}//products/category/${category_name}`)
    .then(res => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

export const fetchCategories = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .get(`${API}/categories`)
    .then(res => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

export const deleteProduct = product_id => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .delete(`${API}/products/${product_id}`)
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data
      });
      toast.success(res.data.message);
      window.location.href = "/"
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
      toast.error(err.response.data);
    });
};

export const updateProduct = (data, product_id) => async dispatch => {
  dispatch({
    type: LOADING
  });
  axios
    .put(`${API}/products/${product_id}`, data)
    .then(res => {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data
      });
      toast.success(res.data.message);
      window.location.href = `/products/${product_id}`;
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};
