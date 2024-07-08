// models/addFundModel.js
const mongoose = require('mongoose');

const addFundSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,  // Assuming paymentId is a string, adjust type as necessary
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
});

const AddFundModel = mongoose.model('AddFundsData', addFundSchema);
module.exports =  AddFundModel ;
