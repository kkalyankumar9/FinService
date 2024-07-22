import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deleteStock, getStockdata } from '../../Redux/Admin/AdminStockCrud/action';
import { toast } from 'react-toastify';

const StocksRender = () => {
  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);
  const isLoading = useSelector((store) => store.StockReducer.isLoading);
  const isError = useSelector((store) => store.StockReducer.isError);
console.log(adminStocks)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStockdata());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStock(id))
      .then(() => {
        toast.success('Stock Deleted');
        dispatch(getStockdata());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Request Error")
      });
  };

  return (
    <div className="container mx-auto my-4">
      {isLoading && <p className="text-center text-xl font-bold">Loading...</p>}
      {isError && <p className="text-center text-xl font-bold text-red-500">Error fetching data</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {adminStocks.map((stock) => (
          <div key={stock._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={stock.image}
              alt={stock.company_name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-2">{stock.company_name}</h2>
              <p className="text-lg text-gray-800 mb-2">{stock.industry}</p>
              <p className="text-lg text-gray-800 mb-2">{stock.location}</p>
              <p className="text-lg text-gray-800 mb-2">Founded: {stock.founded_year}</p>
              <p className="text-lg text-gray-800 mb-2">Revenue: ${stock.revenue}</p>
              <p className="text-lg text-gray-800 mb-2">Employees: {stock.number_of_employees}</p>
              <p className="text-lg text-gray-800 mb-2">Current Price: ${stock.current_price}</p>
              <p className="text-lg text-gray-800 mb-2">Market Cap: ${stock.market_cap}M</p>
              <p className="text-lg text-gray-800 mb-2">P/E Ratio: {stock.pe_ratio}</p>
              <p className="text-lg text-gray-800 mb-2">High: ${stock.high}</p>
              <p className="text-lg text-gray-800 mb-2">Low: ${stock.low}</p>
              <p className="text-lg text-gray-800 mb-2">
                Product Categories: {stock.product_categories?.join(', ') ?? 'N/A'}
              </p>
            </div>
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => handleDelete(stock._id)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
              <Link to={`/admin_stock/${stock._id}`}>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StocksRender;
