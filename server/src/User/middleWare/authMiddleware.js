// middleware/userAuth.js
const jwt = require("jsonwebtoken");
const UserBlackListModule = require("../../Models/userBlackList");


const userAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ msg: "Token not found, please login" });
        } else {
            const isBlacklisted = await UserBlackListModule.findOne({ token });
            if (isBlacklisted) {
                return res.status(400).json({ msg: "Token blacklisted, login again" });
            }
            const decode = jwt.verify(token, process.env.SECRETKEY);
            req.body.username = decode.username;
            req.body.userId = decode.userId;
            next();
        }
    } catch (error) {
        res.status(500).send("Internal server error!");
        console.log(error);
    }
};

module.exports={userAuth};
