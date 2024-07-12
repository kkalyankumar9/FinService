import axios from 'axios';
import { USER_GETSINGLESTOCK_ERROR, USER_GETSINGLESTOCK_REQUEST, USER_GETSINGLESTOCK_SUCCESS, USER_GETSTOCKS_ERROR, USER_GETSTOCKS_REQUEST, USER_GETSTOCKS_SUCCESS } from './actionType';


const API_URL = "https://finservice-backend-server.onrender.com/user";

export const getUserStocksdata = () => async (dispatch) => {
  dispatch({ type: USER_GETSTOCKS_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/stocks_render`);
    dispatch({ type: USER_GETSTOCKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: USER_GETSTOCKS_ERROR });
    console.error(error);
  }
};
export const getUserSingleStock = (id) => async (dispatch) => {
  dispatch({ type: USER_GETSINGLESTOCK_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/stocks_render/${id}`);
    dispatch({ type: USER_GETSINGLESTOCK_SUCCESS, payload: response.data});
    console.log(response.data)
  } catch (error) {
    dispatch({ type: USER_GETSINGLESTOCK_ERROR });
    console.error(error);
  }
};