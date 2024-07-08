// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const AddFundModel  = require('../models/addFundModel');

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const addFunds = async (req, res) => {
    const { amount } = req.body; // Extract amount from request body
    const { username, userId } = req.body; // Extract username and userId from the middleware

    if (!username || !userId) {
        return res.status(400).send({ error: "Username and UserId are required" });
    }

    try {
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).send({ error: "Failed to create order" });
        }

        res.send({ orderId: order.id, amount: order.amount, currency: order.currency });

        const fundData = new AddFundModel({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: null, // Payment ID will be updated after payment verification
            username, // Include username
            userId, // Include userId
        });

        await fundData.save();
        console.log("Fund data saved:", fundData);

    } catch (error) {
        console.error("Error processing add funds:", error);
        res.status(500).send({ error: "An error occurred" });
    }
};

const verifyPayment = async (req, res) => {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.SECRETKEY;

    const generated_signature = crypto.createHmac('sha256', secret)
        .update(order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        try {
            // Update the paymentId in the database after successful verification
            await AddFundModel.updateOne({ orderId: order_id }, { paymentId: razorpay_payment_id });
            res.send({ message: "Payment is successful" });
        } catch (error) {
            console.error("Error updating payment ID:", error);
            res.status(500).send({ error: "An error occurred while updating payment ID" });
        }
    } else {
        res.status(400).send({ error: "Invalid signature" });
    }
};

module.exports = { addFunds, verifyPayment };
