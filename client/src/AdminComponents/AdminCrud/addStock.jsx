import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createStock } from "../../Redux/Admin/AdminStockCrud/action";
import { toast } from "react-toastify";

const AddStocks = () => {
  const initialData = {
    company_name: "",
    image: "",
    location: "",
    founded_year: "",
    revenue: "",
    number_of_employees: "",
    current_price: "",
    market_cap: "",
    pe_ratio: "",
    high: "",
    low: "",
    industry: "",
    product_categories: "",
    trading: false
  };

  const [stockAdd, setStockAdd] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setStockAdd((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for missing fields
    const requiredFields = ["company_name", "image", "location", "founded_year", "revenue", "number_of_employees", "current_price", "market_cap", "pe_ratio", "high", "low", "industry", "product_categories"];
    for (const field of requiredFields) {
      if (!stockAdd[field]) {
        alert(`Please fill in the ${field.replace("_", " ")}`);
        return;
      }
    }

    // Parse the fields correctly
    const newStock = {
      company_name: stockAdd.company_name,
      image: stockAdd.image,
      location: stockAdd.location,
      founded_year: parseInt(stockAdd.founded_year, 10),
      revenue: parseFloat(stockAdd.revenue),
      number_of_employees: parseInt(stockAdd.number_of_employees, 10),
      current_price: parseFloat(stockAdd.current_price),
      market_cap: parseFloat(stockAdd.market_cap),
      pe_ratio: parseFloat(stockAdd.pe_ratio),
      high: parseFloat(stockAdd.high),
      low: parseFloat(stockAdd.low),
      industry: stockAdd.industry,
      product_categories: stockAdd.product_categories.split(",").map(category => category.trim()),
      trading: stockAdd.trading
    };

    console.log(newStock);

    dispatch(createStock(newStock))
      .then(() => {
        toast.success("Stock added successfully");
        navigate('/admin_dashboard');
        setStockAdd(initialData)
         // Redirect to dashboard after successful addition
      })
      .catch((error) => {
        console.error("Error adding stock:", error);
        toast.error("Failed to add stock. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 mt-96 ml-10 ">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Stock</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="company_name" className="block text-sm font-bold text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              placeholder="Company Name"
              name="company_name"
              value={stockAdd.company_name}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              placeholder="Image URL"
              name="image"
              value={stockAdd.image}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              name="location"
              value={stockAdd.location}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="founded_year" className="block text-sm font-bold text-gray-700 mb-2">
              Founded Year
            </label>
            <input
              type="number"
              id="founded_year"
              placeholder="Founded Year"
              name="founded_year"
              value={stockAdd.founded_year}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="revenue" className="block text-sm font-bold text-gray-700 mb-2">
              Revenue
            </label>
            <input
              type="number"
              id="revenue"
              placeholder="Revenue"
              name="revenue"
              value={stockAdd.revenue}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number_of_employees" className="block text-sm font-bold text-gray-700 mb-2">
              Number of Employees
            </label>
            <input
              type="number"
              id="number_of_employees"
              placeholder="Number of Employees"
              name="number_of_employees"
              value={stockAdd.number_of_employees}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="current_price" className="block text-sm font-bold text-gray-700 mb-2">
              Current Price
            </label>
            <input
              type="number"
              id="current_price"
              placeholder="Current Price"
              name="current_price"
              value={stockAdd.current_price}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="market_cap" className="block text-sm font-bold text-gray-700 mb-2">
              Market Cap
            </label>
            <input
              type="number"
              id="market_cap"
              placeholder="Market Cap"
              name="market_cap"
              value={stockAdd.market_cap}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pe_ratio" className="block text-sm font-bold text-gray-700 mb-2">
              P/E Ratio
            </label>
            <input
              type="number"
              id="pe_ratio"
              placeholder="P/E Ratio"
              name="pe_ratio"
              value={stockAdd.pe_ratio}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="high" className="block text-sm font-bold text-gray-700 mb-2">
              High
            </label>
            <input
              type="number"
              id="high"
              placeholder="High"
              name="high"
              value={stockAdd.high}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="low" className="block text-sm font-bold text-gray-700 mb-2">
              Low
            </label>
            <input
              type="number"
              id="low"
              placeholder="Low"
              name="low"
              value={stockAdd.low}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-bold text-gray-700 mb-2">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              placeholder="Industry"
              name="industry"
              value={stockAdd.industry}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product_categories" className="block text-sm font-bold text-gray-700 mb-2">
              Product Categories (comma-separated)
            </label>
            <input
              type="text"
              id="product_categories"
              placeholder="Product Categories"
              name="product_categories"
              value={stockAdd.product_categories}
              onChange={handleChange}
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="trading" className="inline-flex items-center">
              <input
                type="checkbox"
                id="trading"
                name="trading"
                checked={stockAdd.trading}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Trading</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStocks;
