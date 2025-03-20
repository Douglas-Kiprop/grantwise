const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile, updatePassword } = require('../controllers/profileController');
const upload = require('../middleware/uploadMiddleware');

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

// Make sure this route exists
router.put('/password', protect, updatePassword);

// Add this route
router.post('/upload-image', protect, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const user = await User.findById(req.user.userId);
    user.imageUrl = imageUrl;
    await user.save();

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file' });
  }
});

module.exports = router;