const express = require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const { connection } = require("./db");
const adminRouters = require("./src/Routes/adminRoutes");
const StockDataModel = require("./src/Admin/models/stockDataModel");
const  userRouters  = require("./src/Routes/userRoutes");
const UserModel = require("./src/User/Models/userAuthModel");




const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/admin",adminRouters);
app.use("/user",userRouters);
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
