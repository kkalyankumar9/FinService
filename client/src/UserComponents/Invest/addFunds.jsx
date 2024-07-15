import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentComponent = () => {
    const [amount, setAmount] = useState('');
    const userToken = useSelector((store) => store.UserAuthReducer.userToken);


    const handlePayment = async () => {
        try {
            const response = await axios.post('https://finservice-backend-server.onrender.com/user/addfunds', { amount },
                {

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${userToken}`,
                      },
                });
            const { orderId } = response.data;

            const options = {
                key:"rzp_test_i0jQ4pziAEMEgY",
                amount: amount * 100,
                currency: 'INR',
                name: 'Your App Name',
                description: 'Adding funds to your account',
                order_id: orderId,
                handler: async (response) => {
                    const paymentData = {
                        order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    await axios.post('/api/payment/verifyPayment', paymentData);
                    alert('Payment successful!');
                },
                prefill: {
                    name: 'User Name', // prefill user name if available
                    email: 'user@example.com', // prefill user email if available
                    contact: '9876543210', // prefill user contact number if available
                },
                notes: {
                    address: 'Your address',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
            <button onClick={handlePayment}>Add Funds</button>
        </div>
    );
};

export default PaymentComponent;
