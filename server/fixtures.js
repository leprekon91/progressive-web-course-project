Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({ username: 'admin', email: 'admin@todoer.co.il', password: 'p' });
    Accounts.createUser({ username: 'alice', email: 'alice@todoer.co.il', password: 'p' });
    Accounts.createUser({ username: 'bob', email: 'bob@todoer.co.il', password: 'p' });
    Accounts.createUser({ username: 'eve', email: 'eve@todoer.co.il', password: 'p' });
  }
});
