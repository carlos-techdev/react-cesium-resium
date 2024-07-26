const express = require("express");

// Internal Module - Import other routes
const userRoute = require("./auth.route");

// Router Initialization
const masterRoute = express.Router();

// Mounting the sub-routes
masterRoute.use("/auth", userRoute);

module.exports = masterRoute;
