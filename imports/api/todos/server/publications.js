import { Todos } from '../todos';
import { Projects } from '../../projects/projects';

Meteor.publish('todos.statusBar', function({ todos }) {
  return Todos.find({ _id: { $in: todos } }, { fields: { status: 1 } });
});

Meteor.publish('todos.my', function() {
  return Todos.find({ creatorId: this.userId });
});

Meteor.publish('todos.byProject', function({ todos, type }) {
  return Todos.find({ _id: { $in: todos }, status: type });
});
