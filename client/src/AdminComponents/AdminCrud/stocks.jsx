import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStock, getStockdata } from '../../Redux/Admin/AdminStockCrud/action';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const StocksRender = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);
  const isLoading = useSelector((store) => store.StockReducer.isLoading);
  const isError = useSelector((store) => store.StockReducer.isError);

  useEffect(() => {
    // Fetch data for the current page
    dispatch(getStockdata(page))
      .then((result) => {
        // Check if there are more items to load
        if (result.length < 10) { // Assuming limit is 10
          setHasMore(false);
        }
      })
      .catch(() => setHasMore(false));
  }, [page, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStock(id))
      .then(() => {
        toast.success('Stock Deleted');
        dispatch(getStockdata(page)); // Re-fetch data after deletion
      })
      .catch((error) => {
        console.error(error);
        toast.error('Request Error');
      });
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Load next page
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-4 text-red-500">Error fetching data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <InfiniteScroll
        dataLength={adminStocks.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="text-center text-xl font-bold">Loading more...</p>}
        endMessage={<p className="text-center text-xl font-bold">No more stocks to load</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adminStocks.map((stock) => (
            <div key={stock._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={stock.image}
                alt={stock.company_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{stock.company_name}</h2>
                <p className="text-md text-gray-600 mb-1">Industry: {stock.industry}</p>
                <p className="text-md text-gray-600 mb-1">Location: {stock.location}</p>
                <p className="text-md text-gray-600 mb-1">Founded: {stock.founded_year}</p>
                <p className="text-md text-gray-600 mb-1">Revenue: ${stock.revenue}</p>
                <p className="text-md text-gray-600 mb-1">Employees: {stock.number_of_employees}</p>
                <p className="text-md text-gray-600 mb-1">Current Price: ${stock.current_price}</p>
                <p className="text-md text-gray-600 mb-1">Market Cap: ${stock.market_cap}M</p>
                <p className="text-md text-gray-600 mb-1">P/E Ratio: {stock.pe_ratio}</p>
                <p className="text-md text-gray-600 mb-1">High: ${stock.high}</p>
                <p className="text-md text-gray-600 mb-1">Low: ${stock.low}</p>
                <p className="text-md text-gray-600 mb-2">
                  Product Categories: {stock.product_categories?.join(', ') ?? 'N/A'}
                </p>
              </div>
              
              <div className="flex justify-between  items-end  p-4 ">
                <button
                  onClick={() => handleDelete(stock._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
                <Link to={`/admin_stock/${stock._id}`}>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default StocksRender;
