import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Todos } from '../todos';

const createToDo = new ValidatedMethod({
  name: 'todo.create',
  validate: new SimpleSchema({
    title: { type: String },
    description: { type: String, optional: true },
    dueDate: { type: Date },
  }).validator(),
  run({ title, description, dueDate }) {
    Todos.insert({
      title,
      description: description || '',
      dueDate,
      assignedName: Meteor.user().username,
      creatorId: this.userId,
      createdAt: new Date(),
      creatorName: Meteor.user().username,
      status: 'todo',
    });
  },
});
