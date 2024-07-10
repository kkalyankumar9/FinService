import axios from 'axios';
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
} from './actionType';

export const adminRegister = (signup_data) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNUP_REQUEST });
  try {
    const res = await axios.post("https://finservice-backend-server.onrender.com/admin/register", signup_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: ADMIN_SIGNUP_SUCCESS, payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: ADMIN_SIGNUP_ERROR, payload: err.response?.data?.message || err.message });
    return err.response?.data?.message || err.message;
  }
};

export const adminLogIn = (signin_data) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST });
  try {
    const res = await axios.post("https://finservice-backend-server.onrender.com/admin/login", signin_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { token } = res.data;
    localStorage.setItem('adminToken', token); 
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: { token } });
    return res.data;
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_ERROR, payload: error.response?.data?.message || error.message });
    return error.response?.data?.message || error.message;
  }
};

export const adminLogout = () => async (dispatch) => {
  const adminToken = localStorage.getItem('adminToken');


  dispatch({ type: ADMIN_LOGOUT_REQUEST });

  try {
    await axios.post("https://finservice-backend-server.onrender.com/admin/logout", {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken,
      },
    });

  
    localStorage.removeItem('adminToken');
    dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  } catch (err) {
    console.log('Logout Error Response:', err.response); 
    dispatch({ type: ADMIN_LOGOUT_ERROR, payload: err.response?.data?.message || err.message });
  }
};
