const mongoose = require("mongoose");

const userblacklistedSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

const UserBlackListModule =  mongoose.model("userblacklist", userblacklistedSchema);
module.exports = { UserBlackListModule };
