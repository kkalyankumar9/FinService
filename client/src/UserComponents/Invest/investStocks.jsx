import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../LandingPage/navbar';
import { getUserStocksdata } from '../../Redux/User/InvestStocks/action';
import { Link } from 'react-router-dom';

const InvestStocksCom = () => {
  // const userToken = useSelector((store) => store.UserAuthReducer.userToken);
  const dispatch = useDispatch();
  const stockData = useSelector((store) => store.UserStocksReducer.stockData);
  
  useEffect(() => {
    dispatch(getUserStocksdata());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div>
        {stockData && stockData.length > 0 ? (
          stockData.map((stock) => (
            <div key={stock._id}>
              <img src={stock.image} alt='error' />
              <p>{stock.company_name}</p>
              <p>Current Stock Price: {stock.current_price}</p>
              <p>Founded year: {stock.founded_year}</p>
              <p>Industry: {stock.industry}</p>
              <p>Location: {stock.location}</p>
              <p><Link to={`/user_invest/${stock._id}`}>More</Link></p>
            </div>
          ))
        ) : (
          <p>No stocks available</p>
        )}
      </div>
    </>
  );
};

export default InvestStocksCom;
