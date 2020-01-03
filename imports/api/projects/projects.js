import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Projects = new Mongo.Collection('projects');

Projects.deny({
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

Projects.schema = new SimpleSchema({
  title: { type: String },
  description: { type: String, optional: true },
  createdAt: { type: Date },
  dueDate: { type: Date },
  managerId: { type: String },
  sharedWithIds: { type: Array },
  'sharedWithIds.$': { type: String },
  todos: { type: Array },
  'todos.$': { type: String },
});

Projects.attachSchema(Projects.schema);
