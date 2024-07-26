// External Module
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

// Middleware
const verifyLoginMiddleware = async (req, res, next) => {
  try {
    const headersToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(headersToken, process.env.JWT_TOKEN);
    const userId = decoded.userID;
    const existUser = await userModel.findById(userId);
    if (existUser && existUser.active) {
      req.user = existUser;
      next();
    } else {
      throw "unauthorized";
    }
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

// Export
module.exports = verifyLoginMiddleware;
