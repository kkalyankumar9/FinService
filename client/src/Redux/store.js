import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';


import adminReducer from './Admin/Auth/reducer';
import { stockReducer } from './Admin/AdminStockCrud/reducer';
import userReducer from './User/Auth/reducer';
import userStocksReducer from './User/InvestStocks/reducer';


const rootReducer = combineReducers({
  AdminAuthReducer: adminReducer,
  StockReducer: stockReducer,
  UserAuthReducer: userReducer,
  UserStocksReducer: userStocksReducer,
  
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
