import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deleteStock, getStockdata } from '../../Redux/Admin/AdminStockCrud/action';

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
        alert('Stock Deleted');
        dispatch(getStockdata());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin_stock/${id}`);
  };

  return (
    <>
   
      <div className="container mx-auto my-4">
        {isLoading && <p className="text-center">Loading...</p>}

        {isError && <p className="text-center text-red-500">Error fetching data</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {adminStocks?.map((stock) => (
            <div key={stock._id} className="bg-white shadow-md rounded-lg p-4">
              <img src={stock.image} alt={stock.company_name} className="w-full h-32 object-cover rounded-t-lg" />
              <h2 className="text-xl font-bold mt-2">{stock.company_name}</h2>
              <p className="text-gray-600">{stock.industry}</p>
              <p className="text-gray-600">{stock.location}</p>
              <p className="text-gray-600">Founded: {stock.founded_year}</p>
              <p className="text-gray-600">Revenue: ${stock.revenue.toLocaleString()}</p>
              <p className="text-gray-600">Employees: {stock.number_of_employees}</p>
              <p className="text-gray-600">Current Price: ${stock.current_price}</p>
              <p className="text-gray-600">Market Cap: ${stock.market_cap}M</p>
              <p className="text-gray-600">P/E Ratio: {stock.pe_ratio}</p>
              <p className="text-gray-600">High: ${stock.high}</p>
              <p className="text-gray-600">Low: ${stock.low}</p>
              <p className="text-gray-600">Product Categories: {stock.product_categories.join(", ")}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(stock._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <Link to={`/admin_stock/${stock._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StocksRender;
