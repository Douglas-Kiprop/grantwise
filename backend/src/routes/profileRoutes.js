const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile, updatePassword } = require('../controllers/profileController');

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

// Make sure this route exists
router.put('/password', protect, updatePassword);

module.exports = router;