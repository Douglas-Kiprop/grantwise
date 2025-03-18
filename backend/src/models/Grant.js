const mongoose = require('mongoose');

const grantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Youth', 'Business', 'NGO', 'Education']
  },
  amount: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  applicationUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'coming soon'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
grantSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add this near the end of the file, before creating the model
grantSchema.index({ title: 'text', description: 'text' });
grantSchema.index({ category: 1 });
grantSchema.index({ amount: 1 });
grantSchema.index({ status: 1 });
grantSchema.index({ deadline: 1 });
grantSchema.index({ createdAt: -1 });

const Grant = mongoose.model('Grant', grantSchema);

module.exports = Grant;