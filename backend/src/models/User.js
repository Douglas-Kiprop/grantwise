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
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    interests: [String],
    organization: String,
    phone: String,
    name: String
  },
  savedGrants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grant'
  }],
  appliedGrants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grant'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add this method back to the schema
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Remove the duplicate indexes and keep only these
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;