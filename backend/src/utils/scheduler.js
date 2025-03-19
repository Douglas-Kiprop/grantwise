const cron = require('node-cron');
const { checkUpcomingDeadlines } = require('../controllers/notificationController');

// Schedule deadline checks to run daily at midnight
const scheduleDeadlineChecks = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running deadline checks...');
    try {
      await checkUpcomingDeadlines();
      console.log('Deadline checks completed successfully');
    } catch (error) {
      console.error('Error in deadline check scheduler:', error);
    }
  });
};

module.exports = {
  scheduleDeadlineChecks
};