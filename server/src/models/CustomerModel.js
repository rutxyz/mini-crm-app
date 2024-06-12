// server/src/models/CustomerModel.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  total_spends: {
    type: Number,
    default: 0, // Default to 0
  },
  number_of_visits: {
    type: Number,
    default: 0,
  },
  last_visit_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
