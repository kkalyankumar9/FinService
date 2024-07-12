const StockDataModel = require("../../Models/stockDataModel");



const stocksRouter= async (req, res) => {
  
  try {
    const data = await StockDataModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
const stocksByIdRouter= async (req, res) => {
  const {id}=req.params
  
  try {
    const data = await StockDataModel.find({_id:id});
    if (!data) {
      return res.status(404).send({ error: "Stock not found" });
    }
    res.status(200).send({data:data});
  } catch (error) {
    res.status(400).send({ error: error });
  }
};


module.exports = { stocksRouter,stocksByIdRouter };
