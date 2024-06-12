// SavedAudienceModel.js

const mongoose = require('mongoose');

const savedAudienceSchema = new mongoose.Schema({
  filters: {
    totalSpendsGreaterThan: { active: Boolean, value: Number },
    maxVisits: { active: Boolean, value: Number },
    minVisits: { active: Boolean, value: Number },
    lastVisitDate: { active: Boolean, value: Number },
  },
  audience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  audienceSize: Number,
  timestamp: { type: Date, default: Date.now },
});

const SavedAudience = mongoose.model('SavedAudience', savedAudienceSchema);

module.exports = SavedAudience;
