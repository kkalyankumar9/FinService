import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserSingleStock } from '../../Redux/User/InvestStocks/action';
import Navbar from '../LandingPage/navbar';

import StockBarChart from './charts/barChartCom';
import StockLineChart from './charts/lineChartCom';
import Footer from '../LandingPage/footer';
import StockPieChart from './charts/pieChartCom';

const InvestSingleStocksMore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleStockData = useSelector((store) => store.UserStocksReducer.singleStockData);
  const isLoading = useSelector((store) => store.UserStocksReducer.isLoading);

  useEffect(() => {
    dispatch(getUserSingleStock(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!singleStockData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-800">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Stock Info Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 m-6  max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <img
            src={singleStockData.image}
            alt={singleStockData.company_name}
            className="w-28 h-28 rounded-xl shadow-md object-cover"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              {singleStockData.company_name}
            </h2>
            <p className="text-lg text-gray-600">{singleStockData.industry}</p>
            <p className="text-md text-gray-500">{singleStockData.location}</p>
          </div>
        </div>

        {/* Stock Price Highlight */}
        <div className="mt-6 flex justify-between items-center bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-inner">
          <div>
            <p className="text-3xl font-bold text-green-600">
              ₹{singleStockData.current_price}
            </p>
            <p className="text-gray-500">Current Stock Price</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-indigo-600">
              {singleStockData.pe_ratio}
            </p>
            <p className="text-gray-500">P/E Ratio</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-600">
              ₹{singleStockData.market_cap}M
            </p>
            <p className="text-gray-500">Market Cap</p>
          </div>
        </div>

        {/* Stock Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 text-gray-700">
          <p><span className="font-semibold">Founded:</span> {singleStockData.founded_year}</p>
          <p><span className="font-semibold">Revenue:</span> ₹{singleStockData.revenue}</p>
          <p><span className="font-semibold">Employees:</span> {singleStockData.number_of_employees}</p>
          <p><span className="font-semibold">High:</span> ₹{singleStockData.high}</p>
          <p><span className="font-semibold">Low:</span> ₹{singleStockData.low}</p>
          <p><span className="font-semibold">Products:</span> {singleStockData.product_categories.join(", ")}</p>
        </div>

        {/* Buy Button */}
        <div className="flex justify-center mt-10">
          <Link to={`/addfunds/${id}`}>
            <button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
              Buy Stock
            </button>
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col items-center justify-center m-10 space-y-10 px-6 ">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Stock Distribution</h3>
          <StockPieChart data={singleStockData} />
        </div>

        <div className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Stock Performance</h3>
          <StockBarChart data={singleStockData} />
        </div>

        <div className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Historical Trend</h3>
          <StockLineChart data={singleStockData} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestSingleStocksMore;
