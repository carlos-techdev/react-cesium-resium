// External Import
const mongoose = require("mongoose");

// Init Schema
const userSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      index: true,
    },
    last: {
      type: String,
      required: true,
      index: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  randString: {
    type: String,
    required: true,
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
const userModel = new mongoose.model("User", userSchema);
userModel.createIndexes();

module.exports = userModel;
