// External Module
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
require("./config/mongoose");
// Internal Module
const indexRoute = require("./routes/index.route.js");

// Initialize App
const app = express();

// Using Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

// Main Routes
app.use("/api", indexRoute);

module.exports = app;
