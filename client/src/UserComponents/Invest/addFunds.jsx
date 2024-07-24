import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addfundsUser, getTransactionsHistory, getUserSingleStock } from '../../Redux/User/InvestStocks/action';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../LandingPage/navbar';
import AllTransactions from './allTransactions';
import Footer from '../LandingPage/footer';

const RazorpayPayment = () => {
  const { id } = useParams();
  const [no_of_stocks, setNoofstocks] = useState(1);
  const userDetails = { name: "", email: "", contact: "" };
  const [payDetails, setPayDetails] = useState(userDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const singleStockData = useSelector((store) => store.UserStocksReducer.singleStockData);
  const transactionsData = useSelector((store) => store.UserStocksReducer.transactionsData);
  console.log(transactionsData);
  const amount = singleStockData ? singleStockData.current_price : 0;
  console.log(amount);

  useEffect(() => {
    dispatch(getUserSingleStock(id, payDetails));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getTransactionsHistory());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!payDetails.name || !payDetails.email || !payDetails.contact || !no_of_stocks) {
      toast.error('Please fill in all fields');
      return;
    }

    const payload = {
      amount: amount,
      no_of_stocks: +no_of_stocks,
      productId: id,
    };

    dispatch(addfundsUser(payload, payDetails));
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Stock Purchase</h2>
        <p className="text-xl mb-4">Stock Price: <span className="font-semibold">Rs {amount}</span></p>
        <input
          type="number"
          placeholder="Enter number of stocks"
          value={no_of_stocks}
          onChange={(e) => setNoofstocks(e.target.value)}
          className="mb-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={payDetails.name}
          name="name"
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={payDetails.email}
          name="email"
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Enter Contact"
          value={payDetails.contact}
          name="contact"
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Pay
        </button>
        <button
              onClick={handleBack}
              className="mt-4 block w-full text-center text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
       
      </div>
      
    </div>
    <AllTransactions/>
    <Footer/>
    </>
  );
};

export default RazorpayPayment;
