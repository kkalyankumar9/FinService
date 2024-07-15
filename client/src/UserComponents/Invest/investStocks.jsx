import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../LandingPage/navbar';
import { getUserStocksdata } from '../../Redux/User/InvestStocks/action';
import { Link } from 'react-router-dom';

const InvestStocksCom = () => {
  const dispatch = useDispatch();
  const stockData = useSelector((store) => store.UserStocksReducer.stockData);
  const isLoading = useSelector((store) => store.UserStocksReducer.isLoading);
  const [searchStock, setSearchStock] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getUserStocksdata());
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchStock(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredStocks = stockData.filter(stock =>
    stock.company_name.toLowerCase().includes(searchStock.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStocks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!stockData) {
    return <p>No data available</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchStock}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((stock) => (
              <div key={stock._id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={stock.image}
                  alt="error"
                  className="w-full h-32 object-cover rounded-t-md mb-2"
                />
                <h3 className="text-lg font-bold mb-1">{stock.company_name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Current Stock Price: ₹{stock.current_price}
                </p>
                <p className="text-sm text-gray-600 mb-1">Founded: {stock.founded_year}</p>
                <p className="text-sm text-gray-600 mb-1">Industry: {stock.industry}</p>
                <p className="text-sm text-gray-600 mb-1">Location: {stock.location}</p>
                <Link
                  to={`/user_invest/${stock._id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  More
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No stocks available</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default InvestStocksCom;
