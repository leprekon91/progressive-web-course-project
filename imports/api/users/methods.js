import { ValidatedMethod } from 'meteor/mdg:validated-method';

// eslint-disable-next-line no-unused-vars
const googleUser = new ValidatedMethod({
  name: 'users.googleUser',
  validate: null,
  run() {
    Meteor.users.find().forEach((user) => {
      if (!user.username) {
        const { email } = user.services.google;
        const username = email.split('@')[0];
        Meteor.users.update(
          { _id: user._id },
          { $set: { username, emails: [{ address: email, verified: true }] } },
        );
      }
    });
  },
});

// eslint-disable-next-line no-unused-vars
const resendVerification = new ValidatedMethod({
  name: 'users.resendVerification',
  validate: null,
  run() {
    if (this.userId) {
      Accounts.sendVerificationEmail(this.userId);
    }
  },
});
