import { Todos } from '../todos';
import { Projects } from '../../projects/projects';

Meteor.publish('todos.statusBar', function({ todos }) {
  return Todos.find({ _id: { $in: todos } }, { fields: { status: 1 } });
});

Meteor.publish('todos.my', function() {
  return Todos.find({ creatorId: this.userId });
});

Meteor.publish('todos.byProject', function({ projectId }) {
  const project = Projects.findOne({
    _id: projectId,
    $or: [{ managerId: this.userId }, { sharedWithIds: this.userId }],
  });
  if (!project) {
    return this.ready();
  }
  return Todos.find({ _id: { $in: project.todos } });
});
