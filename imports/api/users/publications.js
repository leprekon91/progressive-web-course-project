Meteor.publish('userAvatar', function({ username }) {
  return Meteor.users.find({ username }, { fields: { username: 1 } });
});
