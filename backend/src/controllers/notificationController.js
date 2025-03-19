const { sendEmail } = require('../utils/mailService');
const { deadlineNotificationTemplate } = require('../utils/emailTemplates');
const Grant = require('../models/Grant');
const User = require('../models/User');

// Send deadline notification
const sendDeadlineNotification = async (userId, grantId) => {
  try {
    const user = await User.findById(userId);
    const grant = await Grant.findById(grantId);
    
    if (!user || !grant) {
      throw new Error('User or grant not found');
    }

    const daysLeft = Math.ceil((new Date(grant.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const template = deadlineNotificationTemplate(grant.title, daysLeft, grant.deadline);
    
    await sendEmail(user.email, template.subject, template.text, template.html);
    
    return true;
  } catch (error) {
    console.error('Error sending deadline notification:', error);
    throw error;
  }
};

// Check and send notifications for upcoming deadlines
const checkUpcomingDeadlines = async () => {
  try {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingGrants = await Grant.find({
      deadline: {
        $gte: today,
        $lte: oneWeekFromNow
      }
    });
    
    const users = await User.find({
      'preferences.notificationsEnabled': true
    });
    
    for (const grant of upcomingGrants) {
      for (const user of users) {
        // Check if user is interested in this grant category
        if (user.preferences?.preferredCategories?.includes(grant.category)) {
          await sendDeadlineNotification(user._id, grant._id);
        }
      }
    }
  } catch (error) {
    console.error('Error checking upcoming deadlines:', error);
    throw error;
  }
};

module.exports = {
  sendDeadlineNotification,
  checkUpcomingDeadlines
};