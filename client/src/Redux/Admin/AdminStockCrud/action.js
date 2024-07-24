import axios from "axios";
import { ALLSTOCK_GET_ERROR, ALLSTOCK_GET_REQUEST, ALLSTOCK_GET_SUCCESS, STOCK_ADD_ERROR, STOCK_ADD_REQUEST, STOCK_ADD_SUCCESS, STOCK_DELETE_ERROR, STOCK_DELETE_REQUEST, STOCK_DELETE_SUCCESS, STOCK_GET_ERROR, STOCK_GET_REQUEST, STOCK_GET_SUCCESS, STOCK_UPDATE_ERROR, STOCK_UPDATE_REQUEST, STOCK_UPDATE_SUCCESS } from "./actionType";




const API_URL = "https://finservice-backend-server.onrender.com/admin";

export const getAllStocksdata = () => async (dispatch) => {
  dispatch({ type: ALLSTOCK_GET_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/getallstocks`);
    dispatch({ type: ALLSTOCK_GET_SUCCESS, payload: response.data });
    console.log(response.data)
  } catch (error) {
    dispatch({ type: ALLSTOCK_GET_ERROR });
    console.error(error);
  }
};

export const getStockdata = () => async (dispatch) => {
  dispatch({ type: STOCK_GET_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/getstocks`, {
      headers: { Authorization: `${localStorage.getItem("adminToken")}` },
    });
    dispatch({ type: STOCK_GET_SUCCESS, payload: response.data });
    console.log(response.data)
  } catch (error) {
    dispatch({ type: STOCK_GET_ERROR });
    console.error(error);
  }
};

export const createStock = (newTaskData) => async (dispatch) => {
  dispatch({ type: STOCK_ADD_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/addstock`, newTaskData, {
      headers: { Authorization: `${localStorage.getItem("adminToken")}` },
    });
    dispatch({ type: STOCK_ADD_SUCCESS, payload: response.data });
   
    console.log(response.data);
     dispatch(getStockdata()); 
     
  } catch (error) {
    dispatch({ type: STOCK_ADD_ERROR, payload: error.response.data }); // Ensure to provide error payload if needed
    console.error(error);
  }
}
export const deleteStock = (taskId) => async (dispatch) => {
  dispatch({ type: STOCK_DELETE_REQUEST });
  try {
    await axios.delete(`${API_URL}/deletestock/${taskId}`, {
      headers: { Authorization: `${localStorage.getItem("adminToken")}` },
    });
    dispatch({ type: STOCK_DELETE_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({ type: STOCK_DELETE_ERROR });
    console.error(error);
  }
};

export const updateStock = (taskId, updatedTaskData) => async (dispatch) => {
  dispatch({ type: STOCK_UPDATE_REQUEST });
  try {
    const response = await axios.patch(`${API_URL}/updatestock/${taskId}`, updatedTaskData, {
      headers: { Authorization: `${localStorage.getItem("adminToken")}` },
    });
    dispatch({ type: STOCK_UPDATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: STOCK_UPDATE_ERROR, payload: error.message || "Update failed" });
    console.error(error);
  }
};
