const UserPreference = require('../models/UserPreference');

// Get user preferences
const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let preferences = await UserPreference.findOne({ user: userId });
    
    // If no preferences exist, create default preferences
    if (!preferences) {
      preferences = await UserPreference.create({
        user: userId,
        preferredCategories: [],
        minAmount: 0,
        maxAmount: null,
        notificationsEnabled: true,
        savedSearches: []
      });
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user preferences
const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preferredCategories, minAmount, maxAmount, notificationsEnabled } = req.body;
    
    // Find and update preferences, create if doesn't exist
    let preferences = await UserPreference.findOne({ user: userId });
    
    if (!preferences) {
      preferences = await UserPreference.create({
        user: userId,
        preferredCategories: preferredCategories || [],
        minAmount: minAmount || 0,
        maxAmount: maxAmount || null,
        notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : true,
        savedSearches: []
      });
    } else {
      // Update only provided fields
      if (preferredCategories !== undefined) preferences.preferredCategories = preferredCategories;
      if (minAmount !== undefined) preferences.minAmount = minAmount;
      if (maxAmount !== undefined) preferences.maxAmount = maxAmount;
      if (notificationsEnabled !== undefined) preferences.notificationsEnabled = notificationsEnabled;
      
      await preferences.save();
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Save a search
const saveSearch = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, categories, minAmount, maxAmount } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Search name is required' });
    }
    
    let preferences = await UserPreference.findOne({ user: userId });
    
    if (!preferences) {
      preferences = await UserPreference.create({
        user: userId,
        preferredCategories: [],
        savedSearches: [{
          name,
          categories: categories || [],
          minAmount: minAmount || 0,
          maxAmount: maxAmount || null
        }]
      });
    } else {
      // Check if search with same name exists
      const existingSearchIndex = preferences.savedSearches.findIndex(
        search => search.name === name
      );
      
      if (existingSearchIndex >= 0) {
        // Update existing search
        preferences.savedSearches[existingSearchIndex] = {
          name,
          categories: categories || [],
          minAmount: minAmount || 0,
          maxAmount: maxAmount || null
        };
      } else {
        // Add new search
        preferences.savedSearches.push({
          name,
          categories: categories || [],
          minAmount: minAmount || 0,
          maxAmount: maxAmount || null
        });
      }
      
      await preferences.save();
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a saved search
const deleteSearch = async (req, res) => {
  try {
    const userId = req.user._id;
    const { searchName } = req.params;
    
    const preferences = await UserPreference.findOne({ user: userId });
    
    if (!preferences) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    
    // Filter out the search to delete
    preferences.savedSearches = preferences.savedSearches.filter(
      search => search.name !== searchName
    );
    
    await preferences.save();
    
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserPreferences,
  updateUserPreferences,
  saveSearch,
  deleteSearch
};