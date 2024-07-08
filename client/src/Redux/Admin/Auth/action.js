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

export const adminRegister = (signup_data) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNUP_REQUEST });
  try {
    const res = await fetch("https://spack-solutions.onrender.com/userauth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup_data),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: ADMIN_SIGNUP_SUCCESS, payload: data });
      return data;
    } else {
      throw new Error(data.message || "Signup failed");
    }
  } catch (err) {
    dispatch({ type: ADMIN_SIGNUP_ERROR, payload: err.message });
    return err.message;
  }
};

export const adminLogIn = (signin_data) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST });
  try {
    const res = await fetch("https://spack-solutions.onrender.com/userauth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin_data),
    });
    const data = await res.json();
    if (res.ok) {
      const { token } = data;
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: { token } });
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_ERROR, payload: error.message });
    return error.message;
  }
};

export const adminLogout = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: ADMIN_LOGOUT_REQUEST });
  try {
    const res = await fetch("https://spack-solutions.onrender.com/userauth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      dispatch({ type: ADMIN_LOGOUT_SUCCESS });
    } else {
      throw new Error("Logout failed");
    }
  } catch (err) {
    throw err;
  }
};
