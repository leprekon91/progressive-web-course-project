import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Todos as TodosCollection } from '../../api/todos/todos.js';
import TodoCardModal from '../components/TodoCardModal.jsx';
import CreateTodoForm from '../components/CreateTodoForm.jsx';

function Todos({ ready, todos }) {
  if (!ready) {
    return 'loading';
  }

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col">
          <div className="list-group">
            <div className="list-group-item">
              <CreateTodoForm />
            </div>
            {todos.map((todo) => {
              return (
                <div key={todo._id} className="list-group-item">
                  <TodoCardModal todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Todos.propTypes = { ready: PropTypes.bool.isRequired, todos: PropTypes.array.isRequired };

export default withTracker(() => {
  const ready = Meteor.subscribe('todos.my').ready();
  const todos = TodosCollection.find({ creatorId: Meteor.userId() }).fetch();
  return { ready, todos };
})(Todos);
