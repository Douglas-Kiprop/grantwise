const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  preferredCategories: {
    type: [String],
    default: []
  },
  minAmount: {
    type: Number,
    default: 0
  },
  maxAmount: {
    type: Number,
    default: null
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  savedSearches: [{
    name: String,
    categories: [String],
    minAmount: Number,
    maxAmount: Number
  }]
}, {
  timestamps: true
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);

module.exports = UserPreference;