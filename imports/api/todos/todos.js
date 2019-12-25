import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Todos = new Mongo.Collection('todos');

Todos.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Todos.schema = new SimpleSchema({
  title: { type: String },
  creatorId: { type: String },
  description: { type: String, optional: true },
  createdAt: { type: Date },
  dueDate: { type: Date },
  creatorName: { type: String },
  assignedId: { type: String },
  assignedName: { type: String },
  status: { type: String, allowedValues: ['todo', 'inprog', 'done'] },
});

Todos.attachSchema(Todos.schema);
