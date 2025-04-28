const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const { connection } = require("./db");
const adminRouters = require("./src/Routes/adminRoutes");

const userRouters = require("./src/Routes/userRoutes");
const StockDataModel = require("./src/Models/stockDataModel");
const session = require("express-session");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors())
// app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY, // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.SESSION_KEY === 'production' } // Set secure to true in production
}));

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
