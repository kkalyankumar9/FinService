const StockDataModel = require("../../Models/stockDataModel");


const adminGetAllStocks = async (req, res) => {
  try {
    const stocks = await StockDataModel.find();
    res.status(200).json(stocks);
  } catch (error) {
    console.error(`Error fetching stocks: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const adminGetStocks = async (req, res) => {
  const data=req.body
  try {
    const stocks = await StockDataModel.find(data);
    console.log(stocks.length);
    res.status(200).send(stocks);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const adminAddStocks = async (req, res) => {
  const {
    company_name,
    image,
    location,
    founded_year,
    revenue,
    number_of_employees,
    current_price,
    market_cap,
    pe_ratio,
    high,
    low,
    industry,
    product_categories,
    trading,
    userName,
    userId
  } = req.body; // Changed from res.body to req.body

  console.log("data");

  try {
    const data = new StockDataModel({
      company_name,
      image,
      location,
      founded_year,
      revenue,
      number_of_employees,
      current_price,
      market_cap,
      pe_ratio,
      high,
      low,
      industry,
      product_categories,
      trading,
      userName,
      userId
    });

    console.log(data);
    await data.save();

    res.status(200).send({ msg: "New stock entry has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};




const adminUpdateStocks = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await StockDataModel.findOne({ _id: id });
    if (data.userId !== req.body.userId) {
      res.status(400).send({ err: "Not Authorized" });
    } else {
      await StockDataModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: `Stock having id ${id} is updated ` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};



const adminDeleteStocks= async (req, res) => {
  const { id } = req.params;
  try {
    const data = await StockDataModel.findOne({ _id: id });
    if (data.userId !== req.body.userId) {
      res.status(400).send({ err: "Not Authorized" });
    } else {
      await StockDataModel.findByIdAndDelete({ _id: id} ,req.body);
      res.status(200).send({ msg: `Notes having id ${id} is Deleted ` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
 
};


module.exports = {adminGetAllStocks, adminGetStocks,adminAddStocks,adminUpdateStocks,adminDeleteStocks};
