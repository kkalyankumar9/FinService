import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addfundsUser, getUserSingleStock } from '../../Redux/User/InvestStocks/action';
import { useParams } from 'react-router-dom';

const RazorpayPayment = () => {
    const [no_of_stocks, setNoOfStocks] = useState('');
    const [payments, setPayments] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const userToken = useSelector((store) => store.UserAuthReducer.userToken);
    const singleStockData = useSelector((store) => store.UserStocksReducer.singleStockData);

    useEffect(() => {
        dispatch(getUserSingleStock(id));
    }, [dispatch, id]);

    const handlePayment = async () => {
        const stock_price = singleStockData.current_price;
        const payload = {
            stock_price: stock_price,
            no_of_stocks: no_of_stocks,
            productId: id
            
        };
        dispatch(addfundsUser(payload, addPaymentToTable));
    };

    const addPaymentToTable = (paymentId, orderId, signature) => {
        setPayments([...payments, { paymentId, orderId, signature }]);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    value={singleStockData.current_price || ''}
                    disabled
                />
                <input
                    type="text"
                    placeholder="Enter Number of Stocks"
                    value={no_of_stocks}
                    onChange={(e) => setNoOfStocks(e.target.value)}
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
