import {
  LOADING,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_CATEGORIES,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ERROR,
  ADD_PRODUCT
} from "../../actions/type";

const initialState = {
  products: [],
  product: {},
  categories: [],
  message: "",
  isLoading: false
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ERROR:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        isLoading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
        isLoading: false
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
        isLoading: false
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        isLoading: false
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
        isLoading: false
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
        isLoading: false
      };
    default:
      return state;
  }
};

export default productsReducer;
