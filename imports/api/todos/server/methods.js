import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Todos } from '../todos';
import { Projects } from '../../projects/projects';

const createToDo = new ValidatedMethod({
  name: 'todo.create',
  validate: new SimpleSchema({
    title: { type: String },
    description: { type: String, optional: true },
    dueDate: { type: Date },
    projectId: { type: String, optional: true },
  }).validator(),
  run({ title, description, dueDate, projectId }) {
    const id = Todos.insert({
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
    if (!!projectId && projectId !== 'false') {
      Projects.update({ _id: projectId, managerId: this.userId }, { $push: { todos: id } });
    }
    return id;
  },
});

const deleteTodo = new ValidatedMethod({
  name: 'todo.remove',
  validate: new SimpleSchema({ todoId: { type: String } }).validator(),
  run({ todoId }) {
    Todos.remove({ _id: todoId, creatorId: this.userId });
    const project = Projects.findOne({ todos: todoId });
    if (project) {
      const { _id: projectId, todos } = project;
      const todoIndex = todos.indexOf(todoId);
      todos.splice(todoIndex, 1);
      Projects.update({ _id: projectId }, { $set: { todos } });
    }
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

const addTodoToProject = new ValidatedMethod({
  name: 'todo.addToProject',
  validate: new SimpleSchema({
    todoId: { type: String },
    projectId: { type: String },
  }).validator(),
  run({ todoId, projectId }) {
    Projects.update({ _id: projectId, managerId: this.userId }, { $push: { todos: todoId } });
  },
});

const assignTodo = new ValidatedMethod({
  name: 'todo.assign',
  validate: new SimpleSchema({ todoId: { type: String }, userId: { type: String } }).validator(),
  run({ todoId, userId }) {
    // find project
    const project = Projects.findOne({
      $or: [{ managerId: userId }, { sharedWithIds: userId }],
      todos: todoId,
    });
    if (!project) {
      throw new Meteor.Error('cant-assign-no-proj', "You can't assign a this todo.");
    }
    const user = Meteor.users.findOne({ _id: userId });
    Todos.update(
      { _id: todoId, creatorId: this.userId },
      { $set: { assignedId: user._id, assignedName: user.username } },
    );
  },
});

const editTodo = new ValidatedMethod({
  name: 'todo.edit',
  validate: new SimpleSchema({
    todoId: { type: String },
    title: { type: String },
    description: { type: String },
    dueDate: { type: String },
  }).validator(),
  run({ todoId, title, description, dueDate }) {
    Todos.update(
      { _id: todoId, creatorId: this.userId },
      { $set: { title, description, dueDate } },
    );
  },
});
