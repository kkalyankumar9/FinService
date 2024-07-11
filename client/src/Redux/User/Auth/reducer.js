import { USER_LOGOUT_ERROR, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_ERROR, USER_SIGNIN_REQUEST,  USER_SIGNIN_SUCCESS,  USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST } from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  userToken: localStorage.getItem('userToken') || '',
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SIGNUP_REQUEST:
    case USER_SIGNIN_REQUEST:
    case USER_LOGOUT_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case USER_SIGNUP_ERROR:
    case USER_SIGNIN_ERROR:
    case USER_LOGOUT_ERROR:
      return { ...state, isError: true, isLoading: false, errorMessage: payload };

    case USER_SIGNIN_SUCCESS:
      localStorage.setItem('userToken', payload.token);
      return {
        ...state,
        isAuth: true,
        isError: false,
        isLoading: false,
        userToken: payload.token,
      };

    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem('userToken');
      return {
        ...state,
        isAuth: false,
        isError: false,
        isLoading: false,
        userToken: '',
      };
     

    default:
      return state;
  }
};

export default adminReducer;
