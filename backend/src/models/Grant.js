const mongoose = require('mongoose');

const grantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  amount: {
    type: String, // <-- Change from Number to String
    required: true
  },
  deadline: String, // <-- Change from Date to String
  organization: String,
  eligibility: String,
  applicationUrl: {
    type: String,
    required: true
  },
  category: {
    type: [String], // <--- *** CHANGE BACK TO [String] ***
    required: true,
    // Important: Double-check that this enum list includes ALL possible valid categories
    // that resulted from the split. Add any missing ones if necessary.
    // Consider making them all lowercase for consistency.
    enum: ['research', 'education', 'arts', 'technology', 'social', 'environmental', 'healthcare', 'business', 'ngo', 'other', 'health', 'environment', 'agriculture', 'social justice', 'energy', 'science', 'human rights', 'women and gender', 'economic development', 'civil society', 'social impact', 'sustainable development', 'community development', 'housing', 'employment', 'food', 'conservation', 'media', 'animals and wildlife', 'climate change', 'humanitarian relief']
  },
  last_updated: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Grant', grantSchema);