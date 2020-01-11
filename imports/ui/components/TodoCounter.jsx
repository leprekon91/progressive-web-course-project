import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Todos } from '../../api/todos/todos.js';

function TodoCounter({ color, counter, ready }) {
  return (
    <span className={`badge badge-${color}`}>
      {ready ? counter : <i className="fas fa-spinner" />}
    </span>
  );
}

export default withTracker(({ color = 'secondary' }) => {
  const ready = Meteor.subscribe('todos.my').ready();
  const counter = Todos.find({ assignedId: Meteor.userId(), status: { $ne: 'done' } }).count();

  return { ready, counter, color };
})(TodoCounter);
