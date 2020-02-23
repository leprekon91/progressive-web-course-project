Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'tamir',
      email: 'tamir@gmail.com',
      password: 'גכק3456',
    });
    Accounts.createUser({
      username: 'dasdr',
      email: 'dasdr@gmail.com',
      password: 'dfgd34@',
    });
    Accounts.createUser({
      username: 'Yossi',
      email: 'Yossi@hotmail.com',
      password: 'sdfg###',
    });
    Accounts.createUser({
      username: 'Haim',
      email: 'Haim@msn.com',
      password: 'dfdfg!!',
    });
  }
});
