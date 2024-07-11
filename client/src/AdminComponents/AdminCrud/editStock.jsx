import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockdata, updateStock } from '../../Redux/Admin/AdminStockCrud/action';

const EditStocks = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
   console.log(userId)
  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);

  const [company_name, setCompanyName] = useState('');
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
        alert('Stock data updated');
        dispatch(getStockdata());
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating stock data');
      });
  };

  return (
    <div>
      <h2>Edit Stock</h2>
      <form>
        <label>
          Company Name:
          <input type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Founded Year:
          <input type="text" value={founded_year} onChange={(e) => setFoundedYear(e.target.value)} />
        </label>
        <br />
        <label>
          Revenue:
          <input type="text" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
        </label>
        <br />
        <label>
          Number of Employees:
          <input type="text" value={number_of_employees} onChange={(e) => setNumberOfEmployees(e.target.value)} />
        </label>
        <br />
        <label>
          Current Price:
          <input type="text" value={current_price} onChange={(e) => setCurrentPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Market Cap:
          <input type="text" value={market_cap} onChange={(e) => setMarketCap(e.target.value)} />
        </label>
        <br />
        <label>
          P/E Ratio:
          <input type="text" value={pe_ratio} onChange={(e) => setPeRatio(e.target.value)} />
        </label>
        <br />
        <label>
          High:
          <input type="text" value={high} onChange={(e) => setHigh(e.target.value)} />
        </label>
        <br />
        <label>
          Low:
          <input type="text" value={low} onChange={(e) => setLow(e.target.value)} />
        </label>
        <br />
        <label>
          Industry:
          <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </label>
        <br />
        <label>
          Product Categories:
          <input type="text" value={product_categories} onChange={(e) => setProductCategories(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>
          Update Stock
        </button>
      </form>
    </div>
  );
};

export default EditStocks;
