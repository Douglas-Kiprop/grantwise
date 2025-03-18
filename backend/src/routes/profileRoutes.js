const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  getProfile, 
  updateProfile, 
  saveGrant, 
  removeSavedGrant 
} = require('../controllers/profileController');

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/', getProfile);
router.put('/', updateProfile);

// Saved grants routes
router.post('/saved-grants/:grantId', saveGrant);
router.delete('/saved-grants/:grantId', removeSavedGrant);

module.exports = router;