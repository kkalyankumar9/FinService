import {
  USER_GETSTOCKS_REQUEST,
  USER_GETSTOCKS_SUCCESS,
  USER_GETSTOCKS_ERROR,
  USER_GETSINGLESTOCK_REQUEST,
  USER_GETSINGLESTOCK_SUCCESS,
  USER_GETSINGLESTOCK_ERROR
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  stockData: [],
  singleStockData: null,
};

const userStocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GETSTOCKS_REQUEST:
    case USER_GETSINGLESTOCK_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case USER_GETSTOCKS_ERROR:
    case USER_GETSINGLESTOCK_ERROR:
      return { ...state, isLoading: false, isError: true };

    case USER_GETSTOCKS_SUCCESS:
      return { ...state, stockData: action.payload, isLoading: false, isError: false };

    case USER_GETSINGLESTOCK_SUCCESS:
      return { ...state, singleStockData: action.payload, isLoading: false, isError: false };

    default:
      return state;
  }
};

export default userStocksReducer;
