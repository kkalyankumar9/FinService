import axios from 'axios';
import { USER_FORGOT_PASSWORD_SUCCESS, USER_LOGOUT_ERROR, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_RESET_PASSWORD_SUCCESS, USER_SIGNIN_ERROR, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from './actionType';


export const userRegister = (signup_data) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const res = await axios.post("https://finservice-backend-server.onrender.com/user/register", signup_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type:USER_SIGNUP_SUCCESS, payload: res.data });
    return res.data;
  } catch (err) {
    dispatch({ type: USER_SIGNUP_ERROR, payload: err.response?.data?.message || err.message });
    return err.response?.data?.message || err.message;
  }
};

export const userLogIn = (signin_data) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const res = await axios.post("https://finservice-backend-server.onrender.com/user/login", signin_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { token } = res.data;
   
    localStorage.setItem('userToken', token); 
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { token } });
    return res.data;
  } catch (error) {
    dispatch({ type: USER_SIGNIN_ERROR, payload: error.response?.data?.message || error.message });
    return error.response?.data?.message || error.message;
  }
};

export const userLogout = () => async (dispatch) => {
  const adminToken = localStorage.getItem('userToken');


  dispatch({ type:USER_LOGOUT_REQUEST });

  try {
    await axios.post("https://finservice-backend-server.onrender.com/user/logout", {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken,
      },
    });

  
    localStorage.removeItem('userToken');
    dispatch({ type:USER_LOGOUT_SUCCESS });
  } catch (err) {
    console.log('Logout Error Response:', err.response); 
    dispatch({ type: USER_LOGOUT_ERROR, payload: err.response?.data?.message || err.message });
  }
};


export const forgotPasswordUser = (email) => async (dispatch) => {
  
  try {
    const response = await axios.post('https://finservice-backend-server.onrender.com/user/forgot_password', {
      email: email,
    });
    const data = response.data;
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
    return data; // Optional: Return data for further handling in component
  } catch (error) {
    console.error(error);
    throw new Error('Error sending reset email');
  }
};


export const resetPasswordUser = (token, newPassword) => async (dispatch) => {
  try {
    const response = fetch('https://finservice-backend-server.onrender.com/user/reset_password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  token, newPassword }),
    })
    
  
    const data = response.data;
    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
    return data; // Optional: Return data for further handling in component
  } catch (error) {
    console.error(error);
    throw new Error('Error resetting password');
  }
};