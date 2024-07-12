import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserSingleStock } from '../../Redux/User/InvestStocks/action';

const InvestSingleStocksMore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleStockData=useSelector((store)=>store.UserStocksReducer.singleStockData)
  console.log(id,singleStockData)
  const isLoading = useSelector((store) => store.UserStocksReducer.isLoading);

  useEffect(() => {
    dispatch(getUserSingleStock(id))
   
   }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!singleStockData) {
    return <p>No data available</p>;
  }
 


  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <img
          src={singleStockData.image}
          alt={singleStockData.company_name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-2">{singleStockData.company_name}</h2>
          <p className="text-lg text-gray-800 mb-2">{singleStockData.industry}</p>
          <p className="text-lg text-gray-800 mb-2">{singleStockData.location}</p>
          <p className="text-lg text-gray-800 mb-2">Founded: {singleStockData.founded_year}</p>
          <p className="text-lg text-gray-800 mb-2">Revenue: ${singleStockData.revenue}</p>
          <p className="text-lg text-gray-800 mb-2">Employees: {singleStockData.number_of_employees}</p>
          <p className="text-lg text-gray-800 mb-2">Current Price: ${singleStockData.current_price}</p>
          <p className="text-lg text-gray-800 mb-2">Market Cap: ${singleStockData.market_cap}M</p>
          <p className="text-lg text-gray-800 mb-2">P/E Ratio: {singleStockData.pe_ratio}</p>
          <p className="text-lg text-gray-800 mb-2">High: ${singleStockData.high}</p>
          <p className="text-lg text-gray-800 mb-2">Low: ${singleStockData.low}</p>
          <p className="text-lg text-gray-800 mb-2">
            Product Categories: {singleStockData.product_categories}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestSingleStocksMore;
