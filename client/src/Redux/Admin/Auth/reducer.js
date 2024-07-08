import {
    ADMIN_LOGOUT_REQUEST,
    ADMIN_LOGOUT_SUCCESS,
    ADMIN_SIGNIN_ERROR,
    ADMIN_SIGNIN_REQUEST,
    ADMIN_SIGNIN_SUCCESS,
    ADMIN_SIGNUP_ERROR,
    ADMIN_SIGNUP_REQUEST,
    ADMIN_SIGNUP_SUCCESS,
  } from "./actionType";
  
  const initialState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: localStorage.getItem("token") || ""
  };
  
  const adminReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ADMIN_SIGNUP_REQUEST:
      case ADMIN_SIGNIN_REQUEST:
      case ADMIN_LOGOUT_REQUEST:
        return { ...state, isLoading: true, isError: false };
  
      case ADMIN_SIGNUP_ERROR:
      case ADMIN_SIGNIN_ERROR:
        return { ...state, isError: true, isLoading: false };
  
      case ADMIN_SIGNIN_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          isAuth: true,
          isError: false,
          isLoading: false,
          token: payload.token
        };
  
      case ADMIN_LOGOUT_SUCCESS:
        localStorage.removeItem("token");
        return {
          ...state,
          isAuth: false,
          isError: false,
          isLoading: false,
          token: ""
        };
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  