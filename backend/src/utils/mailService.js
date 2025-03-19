const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const sendEmail = async (to, subject, text, html) => {
  const data = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to,
    subject,
    text,
    html
  };

  try {
    const response = await mg.messages().send(data);
    console.log('Email sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};