const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  image: { type: String },
  location: { type: String },
  founded_year: { type: Number },
  revenue: { type: Number },
  number_of_employees: { type: Number },
  current_price: { type: Number },
  market_cap: { type: Number },
  pe_ratio: { type: Number },
  high: { type: Number },
  low: { type: Number },
  industry: { type: String },
  product_categories: { type: [String] },
  trading: { type: Boolean },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
});

const StockDataModel = mongoose.model("stocksData", stockSchema);

module.exports = StockDataModel;
