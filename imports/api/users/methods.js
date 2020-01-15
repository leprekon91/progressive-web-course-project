import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Email } from 'meteor/email';

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

// eslint-disable-next-line no-unused-vars
const sendEmail = new ValidatedMethod({
  name: 'contactUs',
  validate: new SimpleSchema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
  }).validator(),
  run({ name, email, message }) {
    this.unblock();
    Email.send({
      from: email,
      to: 'reist2009@gmail.com',
      subject: `Message from todoer - From ${name}`,
      text: message.replace('\n', '<br/>'),
    });

    Email.send({
      from: 'contact@Todoer.com',
      to: email,
      subject: `Message from todoer - Hello ${name}!`,
      text: 'Thank you for your message! We will view it and respond shortly!',
    });
  },
});
