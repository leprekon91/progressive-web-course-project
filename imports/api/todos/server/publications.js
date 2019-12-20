import { Todos } from '../todos';

Meteor.publish('todos.statusBar', function ({ todos }) {
  return Todos.find({ _id: { $in: todos } }, { fields: { status: 1 } });
});
