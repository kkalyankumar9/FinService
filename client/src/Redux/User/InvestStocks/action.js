import axios from 'axios';
import { ADD_FUNDS_ERROR, ADD_FUNDS_REQUEST, ADD_FUNDS_SUCCESS, USER_GETSINGLESTOCK_ERROR, USER_GETSINGLESTOCK_REQUEST, USER_GETSINGLESTOCK_SUCCESS, USER_GETSTOCKS_ERROR, USER_GETSTOCKS_REQUEST, USER_GETSTOCKS_SUCCESS } from './actionType';


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
export const addfundsUser = (payload, addPaymentToTable) => async (dispatch) => {
    
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

    const options = {
        key: process.env.KEY_ID,
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
                   
                    addPaymentToTable(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    dispatch({ type: ADD_FUNDS_SUCCESS, payload: response });
                } else {
                    alert('Payment verification failed.');
                    dispatch({ type: ADD_FUNDS_ERROR, error: 'Payment verification failed.' });
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                alert('Payment verification failed.');
            }
        },
        prefill: {
            name: "",
            email: "",
            contact: ""
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
        alert('Payment Failed');
        console.error('Payment failed response:', response);
    });

    rzp1.open();
} catch (error) {
    console.error('Error creating order:', error);
    alert('Failed to create order. Please try again.');
}
};