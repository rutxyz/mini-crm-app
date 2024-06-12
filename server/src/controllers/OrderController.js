// server/src/controllers/OrderController.js
const Order = require('../models/OrderModel');
const Customer = require('../models/CustomerModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { product, quantity, price, customerId } = req.body;
    const order = new Order({ product, quantity, price, customerId });
    await order.save();

    // Update customer's total spends
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    customer.total_spends += quantity * price; // Update total_spends
    await customer.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
