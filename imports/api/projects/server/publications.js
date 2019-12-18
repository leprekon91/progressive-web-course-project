import { Projects } from '../projects';

Meteor.publish('projects.my', function() {
  return Projects.find({ managerId: this.userId });
});

Meteor.publish('projects.single', function({ projectId }) {
  return Projects.find({
    _id: projectId,
    $or: [{ managerId: this.userId }, { sharedWithIds: this.userId }],
  });
});
