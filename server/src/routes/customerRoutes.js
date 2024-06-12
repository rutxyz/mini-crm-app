// server/src/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');
const { getAudienceSize } = require('../controllers/CustomerController');
const SavedAudience = require('../models/SavedAudienceModel');

// Fetch all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const { name, email, total_spends, number_of_visits, last_visit_date } = req.body;
    const customer = new Customer({ name, email, total_spends, number_of_visits, last_visit_date });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/save-audience', async (req, res) => {
  try {
    const { filters, audience, audienceSize } = req.body;

    const newSavedAudience = new SavedAudience({
      filters,
      audience,
      audienceSize,
      timestamp: new Date(),
    });

    await newSavedAudience.save();

    res.status(201).json({ message: 'Audience saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving audience', error });
  }
});



router.get('/saved-audiences', async (req, res) => {
  try {
    const savedAudiences = await SavedAudience.find();
    res.status(200).json(savedAudiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved audiences', error });
  }
});


// Get audience size based on rules
router.post('/query', getAudienceSize);

module.exports = router;
