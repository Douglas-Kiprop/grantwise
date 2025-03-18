const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserApplications,
  createApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');

router.use(protect);

router.get('/', getUserApplications);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;