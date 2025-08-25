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

    const { token, expiresIn } = res.data;

    // Ensure expiresIn is a number
    const expiresInSeconds = Number(expiresIn);
    if (isNaN(expiresInSeconds)) {
      throw new Error('Invalid expiresIn value');
    }

    // Calculate expiration time in milliseconds
    const expirationTime = new Date().getTime() + expiresInSeconds * 1000;
    localStorage.setItem('userToken', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString()); // Store as string

    console.log('Expiration Time:', expirationTime);

    // Function to check if the token is valid
    const isTokenValid = () => {
      const token = localStorage.getItem('userToken');
      const expirationTime = localStorage.getItem('tokenExpiration');
      if (!token || !expirationTime || new Date().getTime() > parseInt(expirationTime, 10)) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenExpiration');
        return false;
      }
      return true;
    };

    console.log('Is Token Valid:', isTokenValid());

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { token } });

    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: USER_SIGNIN_ERROR, payload: errorMessage });

    return errorMessage;
  }
};



export const userLogout = () => async (dispatch) => {
  const userToken = localStorage.getItem('userToken');


  dispatch({ type:USER_LOGOUT_REQUEST });

  try {
    await axios.post("https://finservice-backend-server.onrender.com/user/logout", {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });

  
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiration');
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