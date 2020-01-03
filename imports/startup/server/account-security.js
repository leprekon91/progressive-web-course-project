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
