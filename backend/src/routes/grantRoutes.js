const express = require('express');
const router = express.Router();
const { 
  getAllGrants, 
  getGrant, 
  createGrant, 
  updateGrant, 
  deleteGrant 
} = require('../controllers/grantController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getAllGrants);
router.get('/:id', getGrant);

// Protected routes (require authentication)
router.post('/', protect, createGrant);
router.put('/:id', protect, updateGrant);
router.delete('/:id', protect, deleteGrant);

module.exports = router;