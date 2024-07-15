import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserSingleStock } from '../../Redux/User/InvestStocks/action';
import Navbar from '../LandingPage/navbar';
import ReactApexChart from 'react-apexcharts';

const InvestSingleStocksMore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleStockData = useSelector((store) => store.UserStocksReducer.singleStockData);
  const isLoading = useSelector((store) => store.UserStocksReducer.isLoading);
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['P/E Ratio', 'High', 'Low'],
      colors: ['#6ab04c', '#2980b9', '#f39c12'],
      title: {
        text: 'P/E Ratio, High, and Low Prices',
        align: 'center',
        margin: 20,
        offsetY: 20,
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333'
        }
      }
    },
  });

  useEffect(() => {
    dispatch(getUserSingleStock(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleStockData) {
      setChartOptions({
        series: [singleStockData.pe_ratio, singleStockData.high, singleStockData.low],
        options: {
          ...chartOptions.options,
        }
      });
    }
  }, [singleStockData]);

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
      <div className="bg-white shadow-md rounded-lg p-4">
        <img
          src={singleStockData.image}
          alt={singleStockData.company_name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <div className="px-4">
          <h2 className="text-3xl font-bold mb-2">{singleStockData.company_name}</h2>
          <p className="text-lg text-gray-800 mb-2">{singleStockData.industry}</p>
          <p className="text-lg text-gray-800 mb-2">Location: {singleStockData.location}</p>
          <p className="text-lg text-gray-800 mb-2">Founded: {singleStockData.founded_year}</p>
          <p className="text-lg text-gray-800 mb-2">Revenue: ₹{singleStockData.revenue}</p>
          <p className="text-lg text-gray-800 mb-2">Employees: {singleStockData.number_of_employees}</p>
          <p className="text-lg text-gray-800 mb-2">Current Stock Price: ₹{singleStockData.current_price}</p>
          <p className="text-lg text-gray-800 mb-2">Market Cap: ₹{singleStockData.market_cap}M</p>
          <p className="text-lg text-gray-800 mb-2">P/E Ratio: {singleStockData.pe_ratio}</p>
          <p className="text-lg text-gray-800 mb-2">High: ₹{singleStockData.high}</p>
          <p className="text-lg text-gray-800 mb-2">Low: ₹{singleStockData.low}</p>
          <p className="text-lg text-gray-800 mb-2">
            Product Categories: {singleStockData.product_categories.join(", ")}
          </p>
          <div className="mt-8">
            <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="pie" height={350} />
          </div>
        </div>
        <button><Link to="/addfunds">add</Link></button>
      </div>
    </div>
  );
};

export default InvestSingleStocksMore;
