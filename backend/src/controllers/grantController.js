const Grant = require('../models/Grant');

// Get all grants
const getAllGrants = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query parameters

    let filter = {}; // Initialize an empty filter object
    if (category && category !== 'all') { // Check if a specific category is provided
      // Use $in operator to find grants that include the specified category in their array
      filter.category = { $in: [category] }; // <--- MODIFIED LINE
    }

    // Use the filter object when finding grants. If filter is empty {}, it finds all.
    const grants = await Grant.find(filter);
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

    // Optional: Validate category - Consider if this list should match your schema enum
    // or if enum validation is enough.
    const validCategories = ['research', 'education', 'arts', 'technology', 'social', 'environmental', 'healthcare', 'business', 'ngo', 'other', 'health', 'environment', 'agriculture', 'social justice', 'energy', 'science', 'human rights', 'women and gender', 'economic development', 'civil society', 'social impact', 'sustainable development', 'community development', 'housing', 'employment', 'food', 'conservation', 'media', 'animals and wildlife', 'climate change', 'humanitarian relief']; // Ensure this list is up-to-date
    if (!validCategories.includes(category)) {
      // return res.status(400).json({ message: 'Invalid category' }); // Keep or remove based on needs
    }

    // Use $in operator to find grants where the category array contains the specified category
    const grants = await Grant.find({ category: { $in: [category] } }); // <--- MODIFIED LINE
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
        $unwind: '$category' // <--- ADDED LINE: Deconstruct the category array
      },
      {
        $group: {
          _id: '$category', // Group by the individual category string
          count: { $sum: 1 },
          // Note: Amount calculations might be skewed if a grant belongs to multiple categories.
          // Decide if you want total/avg amount *per category mention* or need a different approach.
          // The current approach sums/averages the grant's full amount for each category it belongs to.
          totalAmount: { $sum: '$amount' }, // Be cautious with interpretation
          avgAmount: { $avg: '$amount' }    // Be cautious with interpretation
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
      deadline,
      limit, // <-- Add limit
      sortBy, // <-- Add sortBy
      sortOrder // <-- Add sortOrder (e.g., 'asc' or 'desc')
    } = req.query;

    const query = {};

    // Keyword search in title, description, and organization (case-insensitive)
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

    // Category filter (case-insensitive)
    if (category) {
      // Use $in with a case-insensitive regex for category array matching
      query.category = { $in: [new RegExp(`^${category}$`, 'i')] }; // <-- MODIFIED LINE for case-insensitivity
    }

    // Deadline filter (grants with deadlines on or after the specified date)
    if (deadline) {
      // Ensure the deadline is treated as the start of the day
      const startOfDay = new Date(deadline);
      startOfDay.setHours(0, 0, 0, 0);
      query.deadline = { $gte: startOfDay };
    }

    // --- Add Sorting Logic ---
    let sortOptions = {};
    if (sortBy) {
      // Default to ascending order unless 'desc' is specified
      const order = sortOrder === 'desc' ? -1 : 1;
      sortOptions[sortBy] = order;
    } else {
      // Default sort if none provided (e.g., by creation date descending)
      sortOptions.createdAt = -1;
    }
    // --- End Sorting Logic ---

    // --- Add Limit Logic ---
    const limitValue = limit ? parseInt(limit, 10) : undefined; // Parse limit to integer, default to no limit
    // --- End Limit Logic ---

    // Apply query, sorting, and limit
    const grants = await Grant.find(query)
                              .sort(sortOptions) // Apply sorting
                              .limit(limitValue); // Apply limit

    res.json(grants);
  } catch (error) {
    console.error('Search grants error:', error); // Log the error for debugging
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
        $unwind: '$category' // <--- ADDED LINE: Deconstruct the category array
      },
      {
        $group: {
          _id: '$category', // Group by the individual category string
          count: { $sum: 1 },
          // Same caution applies here regarding amount interpretation as in getCategoryStats
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


// Get top 4 categories with at least 4 grants each for the landing page
const getLandingPageCategories = async (req, res) => {
  try {
    const minGrantsPerCategory = 4; // Minimum grants needed for a category to be featured
    const numberOfCategories = 4; // Number of categories to feature

    const topCategories = await Grant.aggregate([
      {
        $unwind: '$category' // Deconstruct the category array
      },
      {
        $group: {
          _id: '$category', // Group by category name
          count: { $sum: 1 } // Count grants in each category
        }
      },
      {
        $match: {
          count: { $gte: minGrantsPerCategory } // Filter categories with at least 4 grants
        }
      },
      {
        $sort: { count: -1 } // Sort by count descending (most popular first)
      },
      {
        $limit: numberOfCategories // Limit to the top 4 categories
      },
      {
        $project: { // Only return the category name
          _id: 0, // Exclude the default _id field
          category: '$_id' // Rename _id to category
        }
      }
    ]);

    // Extract just the category names into an array
    const categoryNames = topCategories.map(cat => cat.category);

    res.json(categoryNames); // Send back ["category1", "category2", "category3", "category4"]

  } catch (error) {
    console.error('Error fetching landing page categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories for landing page' });
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
  // getAllUniqueCategories, // If you added this previously
  getCategoryStats,
  searchGrants,
  getGrantAnalytics,
  getRecommendations,
  getLandingPageCategories // <-- Add the new function here
};