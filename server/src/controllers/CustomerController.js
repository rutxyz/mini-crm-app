// server/src/controllers/CustomerController.js
const Customer = require('../models/CustomerModel');

const getAudienceSize = async (req, res) => {
  try {
    const { rules } = req.body;

    const query = {};

    if (rules.total_spends) {
      query.total_spends = { $gte: rules.total_spends.min, $lte: rules.total_spends.max };
    }
    if (rules.number_of_visits) {
      query.number_of_visits = { $gte: rules.number_of_visits.min, $lte: rules.number_of_visits.max };
    }
    if (rules.last_visit_date) {
      query.last_visit_date = { $gte: new Date(rules.last_visit_date.min), $lte: new Date(rules.last_visit_date.max) };
    }

    const audienceSize = await Customer.countDocuments(query);
    res.status(200).json({ audienceSize });
  } catch (error) {
    res.status(500).json({ message: 'Error querying audience size', error });
  }
};

module.exports = {
  getAudienceSize,
};
