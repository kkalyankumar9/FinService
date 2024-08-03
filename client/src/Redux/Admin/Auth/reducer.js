import {
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_ERROR,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_SIGNIN_ERROR,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNUP_ERROR,
  ADMIN_SIGNUP_REQUEST,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_ERROR
} from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  adminToken: localStorage.getItem('adminToken') || '',
  success:null
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_SIGNUP_REQUEST:
    case ADMIN_SIGNIN_REQUEST:
    case ADMIN_LOGOUT_REQUEST:
   case ADMIN_RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case ADMIN_SIGNUP_ERROR:
    case ADMIN_SIGNIN_ERROR:
    case ADMIN_LOGOUT_ERROR:
    case ADMIN_RESET_PASSWORD_ERROR:
      return { ...state, isError: true, isLoading: false, errorMessage: payload };

    case ADMIN_SIGNIN_SUCCESS:
      localStorage.setItem('adminToken', payload.token);
      return {
        ...state,
        isAuth: true,
        isError: false,
        isLoading: false,
        adminToken: payload.token,
      };

    case ADMIN_LOGOUT_SUCCESS:
      localStorage.removeItem('adminToken');
      return {
        ...state,
        isAuth: false,
        isError: false,
        isLoading: false,
        adminToken: '',
      };
      case 'ADMIN_FORGOT_PASSWORD_SUCCESS':
      return { ...state, success: payload, error: null };
      case 'ADMIN_RESET_PASSWORD_SUCCESS':
        return { ...state, loading: false, success: payload, error: null };

    default:
      return state;
  }
};

export default adminReducer;
