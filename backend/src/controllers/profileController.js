const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('savedGrants')
      .populate('appliedGrants.grant');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      'profile.firstName': req.body.firstName,
      'profile.lastName': req.body.lastName,
      'profile.organization': req.body.organization,
      'profile.position': req.body.position,
      'profile.bio': req.body.bio,
      'profile.phone': req.body.phone,
      'profile.interests': req.body.interests,
      'profile.location': req.body.location
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Save grant
exports.saveGrant = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { savedGrants: req.params.grantId } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove saved grant
exports.removeSavedGrant = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedGrants: req.params.grantId } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};