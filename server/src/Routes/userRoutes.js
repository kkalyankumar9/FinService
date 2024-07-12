const express =require("express");
const { userRegistration, userLogin, userLogout } = require("../User/constrains/userAuth");
const { userForgotPassword, userPasswordReset } = require("../User/constrains/userForgotPassword");

const { stocksRouter, stocksByIdRouter } = require("../User/constrains/stocksRenders");
const { addFunds, verifyPayment } = require("../User/constrains/addFundsRouter");

const { userAuth } = require("../User/middleWare/authMiddleware");

const userRouters=express.Router();

// Authentication
userRouters.post("/register",userRegistration)
userRouters.post("/login",userLogin)
userRouters.post("/logout",userAuth, userLogout)
userRouters.post('/forgot_password', userForgotPassword)
userRouters.patch('/reset_password', userPasswordReset)
//Render Stocks
userRouters.get("/stocks_render",stocksRouter)
userRouters.get("/stocks_render/:id",stocksByIdRouter)

//Add Funds
userRouters.post("/addfunds",userAuth,addFunds)
userRouters.post("/verifyPayment",userAuth,verifyPayment)

module.exports=userRouters