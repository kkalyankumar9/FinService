import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockdata, updateStock } from '../../Redux/Admin/AdminStockCrud/action';
import AdminNavbar from '../adminNabar';
import { toast } from 'react-toastify';

const EditStocks = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate=useNavigate()
   console.log(userId)
  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);

  const [company_name, setCompanyName] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [founded_year, setFoundedYear] = useState('');
  const [revenue, setRevenue] = useState('');
  const [number_of_employees, setNumberOfEmployees] = useState('');
  const [current_price, setCurrentPrice] = useState('');
  const [market_cap, setMarketCap] = useState('');
  const [pe_ratio, setPeRatio] = useState('');
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [industry, setIndustry] = useState('');
  const [product_categories, setProductCategories] = useState('');

  useEffect(() => {
    dispatch(getStockdata());
  }, [dispatch]);

  useEffect(() => {
    const existingStock = adminStocks.find((stock) => stock._id === userId);
    
    if (existingStock) {
      setCompanyName(existingStock.company_name);
      setImage(existingStock.image)
      setLocation(existingStock.location);
      setFoundedYear(existingStock.founded_year);
      setRevenue(existingStock.revenue);
      setNumberOfEmployees(existingStock.number_of_employees);
      setCurrentPrice(existingStock.current_price);
      setMarketCap(existingStock.market_cap);
      setPeRatio(existingStock.pe_ratio);
      setHigh(existingStock.high);
      setLow(existingStock.low);
      setIndustry(existingStock.industry);
      setProductCategories(existingStock.product_categories.join(", "));
    }
  }, [userId, adminStocks]);

  const handleUpdate = () => {
    const updatedStockData = {
      company_name,
      image,
      location,
      founded_year: parseInt(founded_year),
      revenue: parseFloat(revenue),
      number_of_employees: parseInt(number_of_employees),
      current_price: parseFloat(current_price),
      market_cap: parseFloat(market_cap),
      pe_ratio: parseFloat(pe_ratio),
      high: parseFloat(high),
      low: parseFloat(low),
      industry,
      product_categories: product_categories.split(",").map(category => category.trim()),
    };
    dispatch(updateStock(userId, updatedStockData))
      .then(() => {
        toast.success('Stock data updated');
        dispatch(getStockdata());
        navigate("/admin_dashboard")
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error updating stock data');
      });
  };

  return (
    <>
    <AdminNavbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-12">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Stock</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="company_name" 
                             className="block text-left text-lg font-medium text-gray-700"

            >Company Name</label>
            <input
              type="text"
              id="company_name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
                      />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-left text-lg font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-left text-lg font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="founded_year" className="block text-left text-lg font-medium text-gray-700">Founded Year</label>
            <input
              type="number"
              id="founded_year"
              value={founded_year}
              onChange={(e) => setFoundedYear(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="revenue" className="block text-left text-lg font-medium text-gray-700">Revenue</label>
            <input
              type="number"
              id="revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number_of_employees" className="block text-left text-lg font-medium text-gray-700">Number of Employees</label>
            <input
              type="number"
              id="number_of_employees"
              value={number_of_employees}
              onChange={(e) => setNumberOfEmployees(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="current_price" className="block text-left text-lg font-medium text-gray-700">Current Price</label>
            <input
              type="number"
              id="current_price"
              value={current_price}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="market_cap" className="block text-left text-lg font-medium text-gray-700">Market Cap</label>
            <input
              type="number"
              id="market_cap"
              value={market_cap}
              onChange={(e) => setMarketCap(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pe_ratio" className="block text-left text-lg font-medium text-gray-700">P/E Ratio</label>
            <input
              type="number"
              id="pe_ratio"
              value={pe_ratio}
              onChange={(e) => setPeRatio(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="high" className="block text-left text-lg font-medium text-gray-700">High</label>
            <input
              type="number"
              id="high"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="low" className="block text-left text-lg font-medium text-gray-700">Low</label>
            <input
              type="number"
              id="low"
              value={low}
              onChange={(e) => setLow(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-left text-lg font-medium text-gray-700">Industry</label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product_categories" className="block text-left text-lg font-medium text-gray-700">Product Categories (comma-separated)</label>
            <input
              type="text"
              id="product_categories"
              value={product_categories}
              onChange={(e) => setProductCategories(e.target.value)}
              className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"      
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-red-500 hover:bg-blue-500 text-white text-xl"      
            >
            Update Stock
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditStocks;
