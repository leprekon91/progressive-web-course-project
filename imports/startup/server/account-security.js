/*
 * New users with an email address will receive an address verification email.
 */
Accounts.config({ sendVerificationEmail: true });

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

ServiceConfiguration.configurations.remove({
  service: 'facebook',
});

ServiceConfiguration.configurations.upsert(
  {
    service: 'facebook',
  },
  {
    $set: {
      appId: Meteor.settings.facebookSignin.appId,
      secret: Meteor.settings.facebookSignin.secret,
    },
  },
);
