const mongoose = require("mongoose");

const ipoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be at least 10 characters'] 
  },
  pricePerShare: {
    type: Number,
    required: true,
    min: [0, 'Price per share must be a positive number'] // Optional: set a minimum value
  },
  totalShares: {
    type: Number,
    required: true,
    min: [0, 'Total shares must be a positive number'] // Optional: set a minimum value
  },
  availableShares: {
    type: Number,
    required: true,
    min: [0, 'Available shares must be a positive number'] // Optional: set a minimum value
  },
  ipoDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  
});

const IpoModel = mongoose.model("IpoData", ipoSchema);

module.exports = IpoModel;
