import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';


import adminReducer from './Admin/Auth/reducer';


const rootReducer = combineReducers({
  AuthReducer: adminReducer, // Corrected reducer name
  // SubReducer: subReducer // Corrected reducer name
  
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
