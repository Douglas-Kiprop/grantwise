const mongoose = require('mongoose');

const grantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  amount: {
    type: Number,
    required: true
  },
  deadline: Date,
  organization: String,
  eligibility: String,
  applicationUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['research', 'education', 'arts', 'technology', 'social', 'environmental', 'healthcare', 'business', 'ngo', 'other']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Grant', grantSchema);