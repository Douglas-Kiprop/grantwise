const express = require('express');
const router = express.Router();
const grantController = require('../controllers/grantController');
const { protect } = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const { body } = require('express-validator');

console.log('grantController:', grantController); // Debug log

// Public routes
router.get('/search', grantController.searchGrants);
router.get('/categories', grantController.getCategories);
router.get('/category/:category', grantController.getGrantsByCategory);
router.get('/stats/categories', grantController.getCategoryStats);
router.get('/analytics', protect, grantController.getGrantAnalytics);
router.get('/recommendations', grantController.getRecommendations);
router.get('/', grantController.getAllGrants);
router.get('/:id', grantController.getGrant);

// Protected routes (require authentication)
// Only admins can create, update, or delete grants
// Validation middleware for grant data
const validateGrant = [
  body('title').notEmpty().withMessage('Title is required'),
  body('amount').notEmpty().withMessage('Amount is required'),
  body('deadline').notEmpty().withMessage('Deadline is required'),
  body('category').notEmpty().withMessage('Category is required'),
  // Add more validations as needed
];

router.post('/', protect, adminOnly, validateGrant, grantController.createGrant);
router.put('/:id', protect, adminOnly, validateGrant, grantController.updateGrant);
router.delete('/:id', protect, adminOnly, grantController.deleteGrant);

module.exports = router;