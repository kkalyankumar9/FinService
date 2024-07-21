import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addfundsUser, getUserSingleStock } from '../../Redux/User/InvestStocks/action';
import { useParams } from 'react-router-dom';

const RazorpayPayment = () => {

    const { id } = useParams();
    const [no_of_stocks, setNoofstocks] = useState('');
   
    const [payments, setPayments] = useState([]);
    const dispatch=useDispatch()
    
    const singleStockData = useSelector((store) => store.UserStocksReducer.singleStockData);
    const amount=singleStockData.current_price
    useEffect(() => {
        dispatch(getUserSingleStock(id));
      }, [dispatch, id]);


    const handlePayment = async () => {
        const payload = {
            amount: amount,
            no_of_stocks:+no_of_stocks,
            productId:id,
            
          
        };
        dispatch(addfundsUser(payload, addPaymentToTable));
    };

    const addPaymentToTable = (paymentId, orderId, signature) => {
        setPayments([...payments, { paymentId, orderId, signature }]);
    };

    return (
        <div>
            <div>
                {amount}
                   
                
                  <input
                    type="text"
                    placeholder="Enter setNoofstocks"
                    value={no_of_stocks}
                    onChange={(e) => setNoofstocks(e.target.value)}
                />
                <button onClick={handlePayment}>Pay</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Order ID</th>
                        <th>Razorpay Signature</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.paymentId}</td>
                            <td>{payment.orderId}</td>
                            <td>{payment.signature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RazorpayPayment;
