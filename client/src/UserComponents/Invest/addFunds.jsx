import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addfundsUser,
  getTransactionsHistory,
  getUserSingleStock,
} from "../../Redux/User/InvestStocks/action";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../LandingPage/navbar";
import Footer from "../LandingPage/footer";

const RazorpayPayment = () => {
  const { id } = useParams();
  const [no_of_stocks, setNoofstocks] = useState(1);
  const userDetails = { name: "", email: "", contact: "" };
  const [payDetails, setPayDetails] = useState(userDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const singleStockData = useSelector(
    (store) => store.UserStocksReducer.singleStockData
  );
  const transactionsData = useSelector(
    (store) => store.UserStocksReducer.transactionsData
  );

  const amount = singleStockData ? singleStockData.current_price : 0;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions =
    transactionsData?.slice(indexOfFirst, indexOfLast) || [];
  console.log(currentTransactions);
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
    if (
      !payDetails.name ||
      !payDetails.email ||
      !payDetails.contact ||
      !no_of_stocks
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const payload = {
      amount: amount.toString(),
      no_of_stocks: +no_of_stocks,
      productId: id,
    };

    dispatch(addfundsUser(payload, payDetails));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const totalPages = Math.ceil(
    (transactionsData?.length || 0) / transactionsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Stock Purchase
          </h2>
          <p className="text-lg mb-4 text-center">
            Stock Price:{" "}
            <span className="font-semibold text-green-600">₹{amount}</span>
          </p>

          <input
            type="number"
            placeholder="Enter number of stocks"
            value={no_of_stocks}
            onChange={(e) => setNoofstocks(e.target.value)}
            className="mb-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={payDetails.name}
            name="name"
            onChange={handleInputChange}
            className="mb-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={payDetails.email}
            name="email"
            onChange={handleInputChange}
            className="mb-4 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Enter Contact"
            value={payDetails.contact}
            name="contact"
            onChange={handleInputChange}
            className="mb-6 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handlePayment}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Pay
          </button>
          <button
            onClick={handleBack}
            className="mt-4 w-full text-center text-lg font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="max-w-5xl mx-auto mt-12 px-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Transaction History
        </h3>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-4">#</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((txn, index) => (
                  <tr key={txn.orderId} className="border-b hover:bg-gray-50">
                    <td className="p-4">{indexOfFirst + index + 1}</td>
                    <td className="p-4 font-medium">
                      {txn.stock_name || txn.productId}
                    </td>
                    <td className="p-4 text-green-600 font-semibold">
                      ₹{(txn.stocks_price * txn.no_of_stocks).toFixed(2)}{" "}
                      <span className="text-xs text-gray-500">
                        {txn.currency}
                      </span>
                    </td>
                    <td className="p-4">{txn.no_of_stocks}</td>
                    <td className="p-4 text-gray-700">{txn.orderId}</td>
                    <td className="p-4 text-gray-700">{txn.username}</td>
                    <td className="p-4 text-gray-500">
                      {new Date(txn.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 m-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Prev
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default RazorpayPayment;
