import { Todos } from '../todos';

Meteor.publish('todos.statusBar', function({ todos }) {
  return Todos.find({ _id: { $in: todos } }, { fields: { status: 1 } });
});

Meteor.publish('todos.my', function() {
  return Todos.find({ creatorId: this.userId });
});
