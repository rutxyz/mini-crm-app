const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');
const Customer = require('../models/CustomerModel');

// Create a new order
// Create a new order
router.post('/', async (req, res) => {
  const { product, price, quantity, customerId } = req.body;

  console.log('Received request body:', req.body); // Add this line for logging

  try {
    // Calculate total price
    const totalPrice = price * quantity;

    // Create new order
    const newOrder = new Order({ product, price, quantity, customerId, total_price: totalPrice });
    const savedOrder = await newOrder.save();

    // Update customer's total spends
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    customer.total_spends += totalPrice;
    await customer.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders', error });
  }
});

module.exports = router;
