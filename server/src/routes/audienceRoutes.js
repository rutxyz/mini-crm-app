const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');

// Get audience size based on rules
router.post('/audience-size', async (req, res) => {
  try {
    const { totalSpends, maxVisits, lastVisitDate } = req.body;

    let query = {};

    if (totalSpends) {
      query.totalSpends = { $gt: 10000 };
    }

    if (maxVisits) {
      query.numberOfVisits = { $lte: 3 };
    }

    if (lastVisitDate) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      query.lastVisitDate = { $lt: threeMonthsAgo };
    }

    const audienceSize = await Customer.countDocuments(query);
    res.status(200).json({ audienceSize });
  } catch (error) {
    res.status(500).json({ message: 'Error querying audience size', error });
  }
});

module.exports = router;
