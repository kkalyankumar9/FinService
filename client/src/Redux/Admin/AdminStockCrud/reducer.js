import { ALLSTOCK_GET_ERROR, ALLSTOCK_GET_REQUEST, ALLSTOCK_GET_SUCCESS, STOCK_ADD_ERROR, STOCK_ADD_REQUEST, STOCK_ADD_SUCCESS, STOCK_DELETE_ERROR, STOCK_DELETE_REQUEST, STOCK_DELETE_SUCCESS, STOCK_GET_ERROR, STOCK_GET_REQUEST, STOCK_GET_SUCCESS, STOCK_UPDATE_ERROR, STOCK_UPDATE_REQUEST, STOCK_UPDATE_SUCCESS } from "./actionType";


const initialState = {
  adminStocks: [],
  amdinAllStocks:[],
  isLoading: false,
  isError: false,
};

export const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOCK_GET_REQUEST:
      case ALLSTOCK_GET_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case STOCK_GET_ERROR:
      case ALLSTOCK_GET_ERROR:
      return { ...state, isLoading: false, isError: true };
    case STOCK_GET_SUCCESS:
      return { ...state, adminStocks: action.payload, isLoading: false, isError: false };
      case ALLSTOCK_GET_SUCCESS:
        return { ...state, amdinAllStocks: action.payload, isLoading: false, isError: false };
      case STOCK_DELETE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case STOCK_DELETE_ERROR:
      return { ...state, isLoading: false, isError: true };
    case STOCK_DELETE_SUCCESS:
      return {
        ...state,
        adminStocks: state.adminStocks.filter((stock) => stock._id !== action.payload),
        isLoading: false,
        isError: false,
      };
    case STOCK_UPDATE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case STOCK_UPDATE_ERROR:
      return { ...state, isLoading: false, isError: true };
    case STOCK_UPDATE_SUCCESS:
      return {
        ...state,
        adminStocks: state.adminStocks.map((stock) =>
          stock._id === action.payload._id ? action.payload : stock
        ),
        isLoading: false,
        isError: false,
      };
    case STOCK_ADD_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case STOCK_ADD_ERROR:
      return { ...state, isLoading: false, isError: true };
    case STOCK_ADD_SUCCESS:
      return {
        ...state,
        adminStocks: [...state.adminStocks, action.payload],
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
