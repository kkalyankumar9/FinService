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
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_FORGOT_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_ERROR,
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


export const forgotPasswordAdmin = (email) => async (dispatch) => {
  
  try {
    const response = await axios.post('https://finservice-backend-server.onrender.com/admin/forgot_password', {
      email: email,
    } );
    const data = response.data;
    dispatch({ type: ADMIN_FORGOT_PASSWORD_SUCCESS, payload: data });
    return data; // Optional: Return data for further handling in component
  } catch (error) {
    console.error(error);
    throw new Error('Error sending reset email');
  }
};


export const resetPasswordAdmin = (token, newPassword) => async (dispatch) => {

  try {
    dispatch({ type: ADMIN_RESET_PASSWORD_REQUEST });
    const response = 
    fetch('https://finservice-backend-server.onrender.com/admin/reset_password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  token, newPassword }),
    });
    
  
    const data =await response.json();
    dispatch({ type: ADMIN_RESET_PASSWORD_SUCCESS, payload: data });
    return data; 
  } catch (error) {
    console.error(error);
    dispatch({ type: ADMIN_RESET_PASSWORD_ERROR, payload: error.message });
    throw new Error('Error resetting password');
  }
};