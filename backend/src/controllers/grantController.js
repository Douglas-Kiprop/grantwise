const Grant = require('../models/Grant');

// Get all grants
const getAllGrants = async (req, res) => {
  try {
    const grants = await Grant.find({});
    res.json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single grant
const getGrant = async (req, res) => {
  try {
    const grant = await Grant.findById(req.params.id);
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    res.json(grant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create grant
const createGrant = async (req, res) => {
  try {
    const grant = new Grant(req.body);
    await grant.save();
    res.status(201).json(grant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update grant
const updateGrant = async (req, res) => {
  try {
    const grant = await Grant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    res.json(grant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete grant
const deleteGrant = async (req, res) => {
  try {
    const grant = await Grant.findByIdAndDelete(req.params.id);
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    res.json({ message: 'Grant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get grants by category
const getGrantsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // Validate category
    const validCategories = ['research', 'education', 'arts', 'technology', 'social', 'environmental', 'healthcare', 'business', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    
    const grants = await Grant.find({ category });
    res.json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available categories
const getCategories = async (req, res) => {
  try {
    const categories = ['research', 'education', 'arts', 'technology', 'social', 'environmental', 'healthcare', 'business', 'ngo', 'other'];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category statistics
const getCategoryStats = async (req, res) => {
  try {
    const stats = await Grant.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgAmount: { $avg: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search and filter grants
const searchGrants = async (req, res) => {
  try {
    const { 
      keyword, 
      minAmount, 
      maxAmount, 
      category,
      deadline 
    } = req.query;
    
    // Build query
    const query = {};
    
    // Keyword search in title and description
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { organization: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    // Amount range
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Deadline filter (grants with deadlines after the specified date)
    if (deadline) {
      query.deadline = { $gte: new Date(deadline) };
    }
    
    const grants = await Grant.find(query).sort({ createdAt: -1 });
    res.json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enhanced Grant Analytics
const getGrantAnalytics = async (req, res) => {
  try {
    // Basic stats
    const totalGrants = await Grant.countDocuments();
    const totalAmount = await Grant.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Success rate analysis
    const statusStats = await Grant.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Category distribution with average amounts
    const categoryAnalysis = await Grant.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgAmount: { $avg: '$amount' },
          maxAmount: { $max: '$amount' },
          minAmount: { $min: '$amount' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Monthly trends for the past year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const monthlyTrends = await Grant.aggregate([
      {
        $match: {
          createdAt: { $gte: oneYearAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgAmount: { $avg: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Deadline distribution
    const deadlineDistribution = await Grant.aggregate([
      {
        $match: {
          deadline: { $exists: true }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$deadline' },
            month: { $month: '$deadline' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      overview: {
        totalGrants,
        totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0
      },
      statusStats,
      categoryAnalysis,
      monthlyTrends,
      deadlineDistribution
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get personalized grant recommendations
const getRecommendations = async (req, res) => {
  try {
    // Get parameters from query or user preferences
    const { categories, minAmount, maxAmount, usePreferences } = req.query;
    
    // Build query based on user preferences or query parameters
    const query = {};
    
    // If usePreferences is true and user is authenticated, use their saved preferences
    if (usePreferences === 'true' && req.user) {
      const UserPreference = require('../models/UserPreference');
      const preferences = await UserPreference.findOne({ user: req.user._id });
      
      if (preferences) {
        // Use preferred categories from user preferences
        if (preferences.preferredCategories && preferences.preferredCategories.length > 0) {
          query.category = { $in: preferences.preferredCategories };
        }
        
        // Use amount range from user preferences
        if (preferences.minAmount || preferences.maxAmount) {
          query.amount = {};
          if (preferences.minAmount) query.amount.$gte = Number(preferences.minAmount);
          if (preferences.maxAmount) query.amount.$lte = Number(preferences.maxAmount);
        }
      }
    } else {
      // Use query parameters
      // Filter by preferred categories
      if (categories) {
        const categoryList = categories.split(',');
        query.category = { $in: categoryList };
      }
      
      // Filter by amount range
      if (minAmount || maxAmount) {
        query.amount = {};
        if (minAmount) query.amount.$gte = Number(minAmount);
        if (maxAmount) query.amount.$lte = Number(maxAmount);
      }
    }
    
    console.log('Query:', JSON.stringify(query));
    
    // Find all matching grants
    const recommendations = await Grant.find(query)
      .sort({ createdAt: -1 })
      .limit(20);
    
    console.log('Found recommendations:', recommendations.length);
    
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGrants,
  getGrant,
  createGrant,
  updateGrant,
  deleteGrant,
  getGrantsByCategory,
  getCategories,
  getCategoryStats,
  searchGrants,
  getGrantAnalytics,
  getRecommendations
};