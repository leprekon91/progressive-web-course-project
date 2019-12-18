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
