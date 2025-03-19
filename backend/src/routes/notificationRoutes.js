const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkUpcomingDeadlines, sendDeadlineNotification } = require('../controllers/notificationController');

// Add debug logging
router.post('/test-notification', protect, async (req, res) => {
  try {
    console.log('Request reached route handler'); // Add debug log
    console.log('Auth user:', req.user);
    console.log('Request body:', req.body);
    const { userId, grantId } = req.body;
    await sendDeadlineNotification(userId, grantId);
    res.json({ message: 'Test notification sent successfully' });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/check-deadlines', protect, async (req, res) => {
  try {
    await checkUpcomingDeadlines();
    res.json({ message: 'Deadline checks completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;