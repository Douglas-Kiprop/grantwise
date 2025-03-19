const deadlineNotificationTemplate = (grantTitle, daysLeft, deadline) => {
  return {
    subject: `Upcoming Grant Deadline: ${grantTitle}`,
    text: `The deadline for "${grantTitle}" is approaching. You have ${daysLeft} days left until ${deadline}.`,
    html: `
      <h2>Upcoming Grant Deadline</h2>
      <p>The deadline for <strong>${grantTitle}</strong> is approaching.</p>
      <p>You have <strong>${daysLeft} days</strong> left until ${deadline}.</p>
      <p>Log in to your GrantWise account to review and complete your application.</p>
    `
  };
};

const welcomeEmailTemplate = (userName) => {
  return {
    subject: 'Welcome to GrantWise',
    text: `Welcome to GrantWise, ${userName}! We're excited to help you find and manage grant opportunities.`,
    html: `
      <h2>Welcome to GrantWise!</h2>
      <p>Hello ${userName},</p>
      <p>We're excited to help you find and manage grant opportunities.</p>
      <p>Get started by:</p>
      <ul>
        <li>Setting up your preferences</li>
        <li>Browsing available grants</li>
        <li>Saving your favorite opportunities</li>
      </ul>
    `
  };
};

module.exports = {
  deadlineNotificationTemplate,
  welcomeEmailTemplate
};