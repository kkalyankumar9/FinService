import axios from 'axios';
import { ADD_FUNDS_ERROR, ADD_FUNDS_REQUEST, ADD_FUNDS_SUCCESS, GET_TRANSACTIONS_ERROR, GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_SUCCESS, USER_GETSINGLESTOCK_ERROR, USER_GETSINGLESTOCK_REQUEST, USER_GETSINGLESTOCK_SUCCESS, USER_GETSTOCKS_ERROR, USER_GETSTOCKS_REQUEST, USER_GETSTOCKS_SUCCESS } from './actionType';

import { toast } from 'react-toastify';
const API_URL = "https://finservice-backend-server.onrender.com/user";

export const getUserStocksdata = () => async (dispatch) => {
  dispatch({ type: USER_GETSTOCKS_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/stocks_render`
    
    );
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
    dispatch({ type: USER_GETSINGLESTOCK_SUCCESS, payload: response.data.data});
    console.log(response.data)
  } catch (error) {
    dispatch({ type: USER_GETSINGLESTOCK_ERROR });
    console.error(error);
  }
};
export const addfundsUser = (payload, payDetails) => async (dispatch) => {
    
  try {
    dispatch({ type: ADD_FUNDS_REQUEST });
    console.log('Request payload:', payload);

    const orderResponse = await axios.post(`${API_URL}/addfunds`, payload, {
        headers: {
            'Content-Type': 'application/json',
             Authorization:`${localStorage.getItem("userToken")}`
        }
    });
    console.log('Order response:', orderResponse.data);

    const { amount: orderAmount, orderId, currency } = orderResponse.data;
// console.log("key_id",ProcessingInstruction.env.REACT_APP_KEY_ID)
//const key_id = process.env.REACT_APP_KEY_ID
    const options = {
        key: "rzp_test_Yp3rYfQtBpL7B9",
        amount: orderAmount.toString(),
        currency: currency,
        name: "Fin Services",
        description: "stocks",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: async (response) => {
            try {
                const paymentVerificationPayload = {
                    order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                };
                console.log('Payment verification payload:', paymentVerificationPayload);

                const paymentVerificationResponse = await axios.post(`${API_URL}/verifyPayment`, paymentVerificationPayload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:`${localStorage.getItem("userToken")}` ,
                    }
                });
                console.log('Payment verification response:', paymentVerificationResponse.data);

                if (paymentVerificationResponse.data.message === "Payment is successful") {
                   
                    // addPaymentToTable(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    dispatch({ type: ADD_FUNDS_SUCCESS, payload: response });
                    toast.success('Payment is successful');
                } else {
                    toast.error('Payment verification failed.');
                    dispatch({ type: ADD_FUNDS_ERROR, error: 'Payment verification failed.' });
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                toast.error('Payment verification failed.');
            }
        },
        prefill: {
            name: payDetails.name,
            email: payDetails.email,
            contact: payDetails.contact
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', (response) => {
        toast.error('Payment Failed');
        console.error('Payment failed response:', response);
    });

    rzp1.open();
} catch (error) {
    console.error('Error creating order:', error);
    toast.error('Failed to create order. Please try again.');
}
};

export const getTransactionsHistory= () => async (dispatch) => {
    dispatch({ type: GET_TRANSACTIONS_REQUEST });
    try {
      const response = await axios.get(`${API_URL}/transactions`,
        {headers: {
            'Content-Type': 'application/json',
             Authorization:`${localStorage.getItem("userToken")}`
        }}
      
      );
      dispatch({ type:GET_TRANSACTIONS_SUCCESS, payload: response.data });
      console.log(response.data)
    } catch (error) {
      dispatch({ type: GET_TRANSACTIONS_ERROR });
      console.error(error);
    }
  };