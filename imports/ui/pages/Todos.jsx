import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import TodoCardModal from '../components/TodoCardModal';
import CreateTodoForm from '../components/CreateTodoForm';

function Todos({ ready, todos }) {
  // eslint-disable-next-line no-restricted-globals
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col">
          {todos.map((todo) => {
            return <TodoCardModal key={todo._id} todo={todo} />;
          })}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CreateTodoForm />
        </div>
      </div>
    </div>
  );
}

Todos.propTypes = { ready: PropTypes.bool.isRequired, todos: PropTypes.array.isRequired };

export default withTracker(() => {
  const ready = true;
  const todos = [
    {
      _id: '123',
      title: 'todo title',
      description: 'description of ToDo',
      createdAt: new Date(),
      dueDate: new Date(),
      creatorName: 'admin',
      assignedName: 'admin',
      status: 'todo',
    },
    {
      _id: '456',
      title: 'todo title 2',
      description: 'description of ToDo 2',
      createdAt: new Date(),
      dueDate: new Date(),
      creatorName: 'admin',
      assignedName: 'assigned',
      status: 'inprog',
    },
  ];
  return { ready, todos };
})(Todos);
