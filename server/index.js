const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const { connection } = require("./db");
const adminRouters = require("./src/Routes/adminRoutes");

const userRouters = require("./src/Routes/userRoutes");
const StockDataModel = require("./src/Models/stockDataModel");

const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.use("/admin", adminRouters);
app.use("/user", userRouters);
// app.use("/add",fundRouter)

app.get("/data", async (req, res) => {
  const stocks = await StockDataModel.find();
  res.send({ msg: stocks });
});

app.listen(PORT, async () => {
  try {
    await connection;

    console.log(`Connected to the database ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
