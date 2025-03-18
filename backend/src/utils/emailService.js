const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendReminderEmail = async (userEmail, grantTitle, notes, reminderDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Reminder: Grant Application - ${grantTitle}`,
    html: `
      <h2>Grant Application Reminder</h2>
      <p>This is a reminder about your grant application for: <strong>${grantTitle}</strong></p>
      <p>Notes: ${notes}</p>
      <p>Reminder set for: ${new Date(reminderDate).toLocaleDateString()}</p>
      <p>Please check your application status and take necessary actions.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};