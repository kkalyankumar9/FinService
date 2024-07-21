const Razorpay = require('razorpay');
const crypto = require('crypto');
const AddFundModel = require('../../Models/addFundModel');

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const addFunds = async (req, res) => {
    const { amount,no_of_stocks,productId, username, userId } = req.body;


    try {
        const options = {
            amount: amount * 100,
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
            paymentId: null,
            no_of_stocks,
            productId,
            username,
            userId,
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
    const secret = process.env.KEY_SECRET; // Ensure you are using the correct environment variable

    console.log("Verification payload received:", req.body);

    const generated_signature = crypto.createHmac('sha256', secret)
        .update(order_id + "|" + razorpay_payment_id)
        .digest('hex');

    console.log("Generated signature:", generated_signature);
    console.log("Received signature:", razorpay_signature);

    if (generated_signature === razorpay_signature) {
        try {
            await AddFundModel.updateOne({ orderId: order_id }, { paymentId: razorpay_payment_id });
            res.send({ message: "Payment is successful" });
        } catch (error) {
            console.error("Error updating payment ID:", error);
            res.status(500).send({ error: "An error occurred while updating payment ID" });
        }
    } else {
        console.error("Invalid signature. Generated:", generated_signature, "Received:", razorpay_signature);
        res.status(400).send({ error: "Invalid signature" });
    }
};
const transactionsHistory =async (req, res)=>{

    try {
        const data=await AddFundModel.find(req.body)
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({ error: "An error occurred" });
    }

}
module.exports = { addFunds, verifyPayment,transactionsHistory };
