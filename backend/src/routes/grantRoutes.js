const express = require('express');
const router = express.Router();
// Import all controller functions
const grantController = require('../controllers/grantController');
const { protect } = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const { body } = require('express-validator');

// Check if the specific function exists on the imported object
if (!grantController || typeof grantController.getLandingPageCategories !== 'function') {
  console.error("Error: getLandingPageCategories function not found in grantController. Check controller exports.");
  // Optionally, throw an error or exit if this is critical
  // throw new Error("Missing critical controller function: getLandingPageCategories");
}


// Public routes
router.get('/search', grantController.searchGrants);
router.get('/categories', grantController.getCategories); // Existing static categories route
// Add the new route for dynamic landing page categories
router.get('/landing/categories', grantController.getLandingPageCategories);
router.get('/category/:category', grantController.getGrantsByCategory);
router.get('/stats/categories', grantController.getCategoryStats);
router.get('/analytics', protect, grantController.getGrantAnalytics); // Should analytics be protected? Check requirements.
router.get('/recommendations', grantController.getRecommendations); // Consider if recommendations should be protected
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