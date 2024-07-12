import {
  USER_GETSTOCKS_REQUEST,
  USER_GETSTOCKS_SUCCESS,
  USER_GETSTOCKS_ERROR
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  stockData: [],
};

const userStocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GETSTOCKS_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case USER_GETSTOCKS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case USER_GETSTOCKS_SUCCESS:
      return { ...state, stockData: action.payload, isLoading: false, isError: false };
    default:
      return state;
  }
};

export default userStocksReducer;
