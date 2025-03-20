const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Reset password request received for:', email);
    
    const user = await User.findOne({ email });
    
    return res.status(200).json({ 
      success: true,
      message: 'If an account exists with this email, you will receive reset instructions.' 
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

module.exports = router;