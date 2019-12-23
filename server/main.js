import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import './fixtures.js';
import { Todos } from '../imports/api/todos/todos.js';

Meteor.startup(() => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://localhost:3000';

  if (Todos.find().count() === 0) {
    Todos.insert({
      title: 'todo title',
      description: 'description of ToDo',
      createdAt: new Date(),
      dueDate: new Date(),
      creatorName: 'admin',
      assignedName: 'assigned',
      status: 'todo',
    });
  }
});
