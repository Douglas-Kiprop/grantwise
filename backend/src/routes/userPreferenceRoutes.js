const express = require('express');
const router = express.Router();
const {
  getUserPreferences,
  updateUserPreferences,
  saveSearch,
  deleteSearch
} = require('../controllers/userPreferenceController');
const { protect } = require('../middleware/auth');  // Changed from authMiddleware to auth

// All routes require authentication
router.use(protect);

router.get('/', getUserPreferences);
router.put('/', updateUserPreferences);
router.post('/searches', saveSearch);
router.delete('/searches/:searchName', deleteSearch);

module.exports = router;