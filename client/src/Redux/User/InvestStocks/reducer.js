import {
  USER_GETSTOCKS_REQUEST,
  USER_GETSTOCKS_SUCCESS,
  USER_GETSTOCKS_ERROR,
  USER_GETSINGLESTOCK_REQUEST,
  USER_GETSINGLESTOCK_SUCCESS,
  USER_GETSINGLESTOCK_ERROR,
  ADD_FUNDS_SUCCESS,
  ADD_FUNDS_REQUEST,
  ADD_FUNDS_ERROR,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  stockData: [],
  transactionsData: [],
  singleStockData: null,
};

const userStocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GETSTOCKS_REQUEST:
    case ADD_FUNDS_REQUEST:
    case USER_GETSINGLESTOCK_REQUEST:
    case GET_TRANSACTIONS_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case USER_GETSTOCKS_ERROR:
    case ADD_FUNDS_ERROR:
    case USER_GETSINGLESTOCK_ERROR:
      case GET_TRANSACTIONS_ERROR:
      return { ...state, isLoading: false, isError: true };

    case USER_GETSTOCKS_SUCCESS:
      return {
        ...state,
        stockData: action.payload,
        isLoading: false,
        isError: false,
      };
      case GET_TRANSACTIONS_SUCCESS:
        return {
          ...state,
          transactionsData: action.payload,
          isLoading: false,
          isError: false,
        };

    case USER_GETSINGLESTOCK_SUCCESS:
      return {
        ...state,
        singleStockData: action.payload,
        isLoading: false,
        isError: false,
      };
    case ADD_FUNDS_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    default:
      return state;
  }
};

export default userStocksReducer;
