import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

const googleUser = new ValidatedMethod({
  name: 'users.googleUser',
  validate: null,
  run() {
    const user = Meteor.user();
    if (user) {
      const { email } = user.services.google;
      const username = email.split('@')[0];
      Meteor.users.update(
        { _id: user._id },
        { $set: { username, emails: [{ address: email, verified: true }] } },
      );
    }
  },
});

const facebookUser = new ValidatedMethod({
  name: 'users.facebookUser',
  validate: null,
  run() {
    const user = Meteor.user();
    if (user) {
      const { email } = user.services.facebook;
      const username = email.split('@')[0];
      Meteor.users.update(
        { _id: user._id },
        { $set: { username, emails: [{ address: email, verified: true }] } },
      );
    }
  },
});
