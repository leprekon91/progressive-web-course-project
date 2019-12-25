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
      assignedId: this.userId,
      assignedName: Meteor.user().username,
      creatorId: this.userId,
      createdAt: new Date(),
      creatorName: Meteor.user().username,
      status: 'todo',
    });
  },
});

const changeTodoState = new ValidatedMethod({
  name: 'todos.changeStatus',
  validate: new SimpleSchema({
    todoId: { type: String },
    status: { type: String, allowedValues: ['todo', 'inprog', 'done'] },
  }).validator(),
  run({ todoId, status }) {
    Todos.update({ _id: todoId, assignedId: this.userId }, { $set: { status } });
  },
});
