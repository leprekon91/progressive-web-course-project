import { Projects } from '../projects';

Meteor.publish('projects.my', function () {
  return Projects.find({ managerId: this.userId });
});
