const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
