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
    <div>
      <Navbar />
      <div className=" from-blue-50 to-indigo-100 shadow-lg rounded-lg p-8 m-6 max-w-4xl mx-auto">
  <img
    src={singleStockData.image}
    alt={singleStockData.company_name}
    className="w-full h-60  rounded-t-lg mb-6"
  />
  <div className="px-6">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{singleStockData.company_name}</h2>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Industry:</span> {singleStockData.industry}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Location:</span> {singleStockData.location}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Founded:</span> {singleStockData.founded_year}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Revenue:</span> ₹{singleStockData.revenue}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Employees:</span> {singleStockData.number_of_employees}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Current Stock Price:</span> ₹{singleStockData.current_price}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Market Cap:</span> ₹{singleStockData.market_cap}M
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">P/E Ratio:</span> {singleStockData.pe_ratio}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">High:</span> ₹{singleStockData.high}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Low:</span> ₹{singleStockData.low}
    </p>
    <p className="text-xl text-gray-700 mb-3">
      <span className="font-semibold">Product Categories:</span> {singleStockData.product_categories.join(", ")}
    </p>
    <div className="flex justify-center mt-8">
      <Link to={`/addfunds/${id}`}>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200">
          Buy
        </button>
      </Link>
    </div>
  </div>
</div>



<div className="flex flex-col items-center justify-center mt-8 space-y-8">
  <div className="w-full max-w-3xl">
  
    <StockPieChart data={singleStockData} />
  </div>
  <div className="w-full max-w-3xl">
    <StockBarChart data={singleStockData} />
  </div>
  <div className="w-full max-w-3xl">
    <StockLineChart data={singleStockData} />
  </div>
</div>

     
 <Footer/>
    </div>
  );
};

export default InvestSingleStocksMore;
