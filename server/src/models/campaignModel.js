const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  audience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SavedAudience', // Assuming you have a SavedAudience model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
