const express = require("express");
const { adminRegistration, adminLogin, adminLogout } = require("../Admin/constrains/adminAuth");
const { adminGetStocks, adminAddStocks, adminUpdateStocks, adminDeleteStocks, adminGetAllStocks } = require("../Admin/constrains/adminCrud");
const { adminForgotPassword, adminPasswordReset } = require("../Admin/constrains/adminForgotPassword");
const { adminAuth } = require("../Admin/middlewareAdmin/adminMiddleware");

const adminRouters = express.Router();

// Authentication
adminRouters.post("/register", adminRegistration);
adminRouters.post("/login", adminLogin);
adminRouters.post("/logout", adminLogout);
adminRouters.post('/forgot_password', adminForgotPassword)
adminRouters.patch('/reset_password', adminPasswordReset)

adminRouters.get("/getallstocks", adminGetAllStocks)
adminRouters.get("/getstocks",adminAuth, adminGetStocks)
adminRouters.post("/addstock",adminAuth,adminAddStocks)
adminRouters.patch("/updatestock/:id",adminAuth,adminUpdateStocks)
adminRouters.delete("/deletestock/:id",adminAuth,adminDeleteStocks)



module.exports = adminRouters;
