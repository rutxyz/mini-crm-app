const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaignModel');

// Create Campaign
router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve All Campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve Single Campaign
router.get('/:id', getCampaign, (req, res) => {
  res.json(res.campaign);
});

// Middleware to get a single campaign by ID
async function getCampaign(req, res, next) {
  let campaign;
  try {
    campaign = await Campaign.findById(req.params.id);
    if (campaign == null) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.campaign = campaign;
  next();
}

module.exports = router;
