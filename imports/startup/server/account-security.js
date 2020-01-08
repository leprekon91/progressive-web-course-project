import { Email } from 'meteor/email';

/*
 * New users with an email address will receive an address verification email.
 */
Accounts.config({ sendVerificationEmail: true });

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
  return Meteor.absoluteUrl(`verify-email/${token}`);
};

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: Meteor.settings.googleSignin.clientId,
      secret: Meteor.settings.googleSignin.secret,
    },
  },
);

Meteor.startup(function() {
  if (Meteor.settings.email.enabled) {
    process.env.MAIL_URL = Meteor.settings.email.smtpUrl;

    if (Meteor.isServer) {
      Email.send({
        from: 'from@mailinator.com',
        to: 'reist2009@gmail.com',
        subject: 'Subject',
        text: 'Here is some text - Mail is working!'
      });
    }
  }
});


// Email Temaplates

Accounts.emailTemplates.siteName = 'To - Doer';
Accounts.emailTemplates.from = 'Todoer <team@dct.com>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to Todoer, ${user.username}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return `Hello ${user.username}!<br/> You have been selected to participate in building a better future! To activate your account, simply click the link below:<br/><a href="${url}">Link</a>`;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'Todoer Password Reset <no-reply@dct.com>';
};
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return 'Activate your account now!';
  },
  text(user, url) {
    return `Hey ${user.username}! Thank you for joining us, and welcome to Todoer Tool, Verify your e-mail by following this link: ${url}`;
  },
};
