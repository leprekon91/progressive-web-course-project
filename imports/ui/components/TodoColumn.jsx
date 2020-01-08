import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Todos } from '../../api/todos/todos.js';
import TodoCardModal from './TodoCardModal.jsx';

function TodoColumn({ type, todos, ready }) {
  const getTodoColor = (s) => {
    switch (s) {
      case 'todo':
        return 'warning';
      case 'inprog':
        return 'primary';
      case 'done':
        return 'success';
      default:
        return 'info';
    }
  };
  if (!ready) {
    return 'loading';
  }
  return (
    <div className="card text-white  mb-3">
      <div className={`card-header bg-${getTodoColor(type)}`}>
        To-do
        <span className="badge badge-secondary float-right">{todos.length}</span>
      </div>
      <div className="card-body">
        {todos.map((t) => (
          <TodoCardModal key={t._id} todo={t} />
        ))}
        {ready && 'LOADING'}
      </div>
    </div>
  );
}

export default withTracker(({ type, todosIds }) => {
  console.log(todosIds);
  const ready = Meteor.subscribe('todos.byProject', { todos: todosIds, type }).ready();
  const todos = Todos.find({ _id: { $in: todosIds }, status: type }).fetch();
  console.table(todos);
  return { type, todos, ready };
})(TodoColumn);
