const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/grantController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/search', searchGrants);
router.get('/categories', getCategories);
router.get('/category/:category', getGrantsByCategory);
router.get('/stats/categories', getCategoryStats);
// Add analytics route
router.get('/analytics', protect, getGrantAnalytics);
router.get('/recommendations', getRecommendations);
router.get('/', getAllGrants);
router.get('/:id', getGrant);

// Protected routes (require authentication)
router.post('/', protect, createGrant);
router.put('/:id', protect, updateGrant);
router.delete('/:id', protect, deleteGrant);

module.exports = router;