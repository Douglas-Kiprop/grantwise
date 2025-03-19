const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
  try {
    console.log('User ID from token:', req.user.userId); // Debug line
    
    const user = await User.findById(req.user.userId).select('-password');
    console.log('Found user:', user); // Debug line
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error); // Debug line
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, organization, phone } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (organization) user.organization = organization;
    if (phone) user.phone = phone;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePassword = async (req, res) => {
  try {
    console.log('Password update request received:', req.body);
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    console.log('Password updated successfully');
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword
};