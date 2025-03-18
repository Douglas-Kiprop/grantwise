const Application = require('../models/Application');
const Grant = require('../models/Grant');

// Get all applications for a user
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('grant')
      .sort('-createdAt');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create application
exports.createApplication = async (req, res) => {
  try {
    const { grantId, status, notes, reminderDate } = req.body;
    
    const grant = await Grant.findById(grantId);
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }

    const application = new Application({
      user: req.user._id,
      grant: grantId,
      status,
      notes,
      reminderDate,
      appliedDate: status === 'applied' ? Date.now() : null
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update application
exports.updateApplication = async (req, res) => {
  try {
    const { status, notes, reminderDate } = req.body;
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (status) {
      application.status = status;
      if (status === 'applied' && !application.appliedDate) {
        application.appliedDate = Date.now();
      }
    }
    if (notes) application.notes = notes;
    if (reminderDate) application.reminderDate = reminderDate;

    await application.save();
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};