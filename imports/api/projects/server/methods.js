import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Projects } from '../projects';

const createProject = new ValidatedMethod({
  name: 'projects.new',
  validate: new SimpleSchema({
    title: { type: String },
    description: { type: String, optional: true },
    dueDate: { type: Date },
  }).validator(),
  run({ title, description, dueDate }) {
    if (!this.userId) {
      throw new Meteor.Error('no-user', 'You must be logged in to create projects');
    } else {
      Projects.insert({
        title,
        description: description || '',
        dueDate,
        createdAt: new Date(),
        sharedWithIds: [],
        todos: [],
        managerId: this.userId,
      });
    }
  },
});

const shareProject = new ValidatedMethod({
  name: 'project.share',
  validate: new SimpleSchema({ projectId: { type: String }, email: { type: String } }).validator(),
  run({ projectId, email }) {
    console.log({ projectId, email });
    const user = Accounts.findUserByEmail(email);
    const project = Projects.findOne({ _id: projectId });
    if (user && project && project.sharedWithIds.indexOf(user._id) < 0) {
      Projects.update(
        { _id: projectId, managerId: this.userId },
        { $push: { sharedWithIds: user._id } },
      );
    }
  },
});
