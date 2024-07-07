const jwt = require("jsonwebtoken");
const AdminBlackListModule = require("../models/adminBlacklist");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing, please login" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "Token not found, please login" });
    }

    const isBlacklisted = await AdminBlackListModule.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ msg: "Token blacklisted, login again" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.body.userName = decoded.userName;
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Token expired, please login again" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token, please login again" });
    }
    console.error("Authentication error:", error);
    res.status(500).send("Internal server error!");
  }
};

module.exports = { adminAuth };
