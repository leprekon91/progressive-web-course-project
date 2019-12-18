

Meteor.startup(() => {
  if (!Meteor.users.findOne({ username: 'admin' })) {
    Accounts.createUser({ username: 'admin', email: 'admin@todoer.co.il', password: 'p' });
  }
});
