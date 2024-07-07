const StockDataModel = require("../../Admin/models/stockDataModel");


const stocksRouter= async (req, res) => {
  
  try {
    const data = await StockDataModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};


module.exports = { stocksRouter };
