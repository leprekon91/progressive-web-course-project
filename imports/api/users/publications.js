Meteor.publish('userAvatar', function({ username }) {
  return Meteor.users.find({ username }, { fields: { username: 1 } });
});

Meteor.publish('users.byArray', function({ users }) {
  return Meteor.users.find({ _id: { $in: users } });
});
