// External Import
const mongoose = require("mongoose");

// Init Schema
const settingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  setting: {
    type: Object
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// Model Init
const settingModel = new mongoose.model("Setting", settingSchema);
settingModel.createIndexes();

module.exports = settingModel;
