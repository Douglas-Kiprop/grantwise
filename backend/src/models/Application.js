const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grant',
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'applied', 'pending', 'successful', 'unsuccessful'],
    default: 'planning'
  },
  appliedDate: Date,
  notes: String,
  reminderDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;