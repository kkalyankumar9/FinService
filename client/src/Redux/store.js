import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';


import adminReducer from './Admin/Auth/reducer';
import { stockReducer } from './Admin/AdminStockCrud/reducer';


const rootReducer = combineReducers({
  AdminAuthReducer: adminReducer, // Corrected reducer name
  StockReducer: stockReducer // Corrected reducer name
  
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
