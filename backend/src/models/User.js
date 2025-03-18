const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    organization: String,
    position: String,
    bio: String,
    phone: String,
    interests: [{
      type: String,
      enum: ['Youth', 'Business', 'NGO', 'Education']
    }],
    location: {
      country: String,
      city: String
    },
    avatar: String
  },
  savedGrants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grant'
  }],
  appliedGrants: [{
    grant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grant'
    },
    status: {
      type: String,
      enum: ['pending', 'submitted', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedDate: {
      type: Date,
      default: Date.now
    }
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Existing password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Existing password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add indexes
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'profile.interests': 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;