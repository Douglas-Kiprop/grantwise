const Grant = require('../models/Grant');
const NodeCache = require('node-cache');

// Cache with 5 minute TTL
const grantsCache = new NodeCache({ stdTTL: 300 });

// Get all grants
exports.getAllGrants = async (req, res) => {
  try {
    const { 
      search, 
      category, 
      minAmount, 
      maxAmount, 
      status,
      sortBy,
      page = 1,
      limit = 10
    } = req.query;

    // Create cache key from query params
    const cacheKey = `grants_${search || ''}_${category || ''}_${minAmount || ''}_${maxAmount || ''}_${status || ''}_${sortBy || ''}_${page}_${limit}`;
    
    // Check cache first
    const cachedResult = grantsCache.get(cacheKey);
    if (cachedResult) {
      return res.status(200).json(cachedResult);
    }

    // Build query
    let query = {};

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by amount range
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Build sort option
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'amount':
          sort.amount = 1;
          break;
        case 'deadline':
          sort.deadline = 1;
          break;
        default:
          sort.createdAt = -1;
      }
    }

    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Use lean() for better performance
    const grants = await Grant.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip)
      .lean();

    // Get total count for pagination (use countDocuments for better performance)
    const total = await Grant.countDocuments(query);

    const result = {
      grants,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalGrants: total
    };

    // Store in cache
    grantsCache.set(cacheKey, result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cache when data changes
const clearGrantsCache = () => {
  grantsCache.flushAll();
};

// Get single grant
exports.getGrant = async (req, res) => {
  try {
    const cacheKey = `grant_${req.params.id}`;
    const cachedGrant = grantsCache.get(cacheKey);
    
    if (cachedGrant) {
      return res.status(200).json(cachedGrant);
    }

    const grant = await Grant.findById(req.params.id).lean();
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    
    grantsCache.set(cacheKey, grant);
    res.status(200).json(grant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new grant
exports.createGrant = async (req, res) => {
  try {
    const grant = new Grant(req.body);
    const newGrant = await grant.save();
    clearGrantsCache();
    res.status(201).json(newGrant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update grant
exports.updateGrant = async (req, res) => {
  try {
    const grant = await Grant.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    clearGrantsCache();
    grantsCache.del(`grant_${req.params.id}`);
    res.status(200).json(grant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete grant
exports.deleteGrant = async (req, res) => {
  try {
    const grant = await Grant.findByIdAndDelete(req.params.id);
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    clearGrantsCache();
    grantsCache.del(`grant_${req.params.id}`);
    res.status(200).json({ message: 'Grant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};