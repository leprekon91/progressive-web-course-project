/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function ProjectStatusBar({ todoArr }) {
  const todoPercent = todoArr.filter((t) => t.status === 'todo').length / todoArr.length;
  const inprogPercent = todoArr.filter((t) => t.status === 'inprog').length / todoArr.length;
  const donePercent = todoArr.filter((t) => t.status === 'done').length / todoArr.length;
  return (
    <div className="progress">
      {todoArr.length !== 0 && (
        <>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${todoPercent * 100}%` }}
            aria-valuenow={todoPercent * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${inprogPercent * 100}%` }}
            aria-valuenow={inprogPercent * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${donePercent * 100}%` }}
            aria-valuenow={donePercent * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </>
      )}
    </div>
  );
}

export default withTracker(({ todos }) => {
  const ready = Meteor.subscribe('todos.byArray', { todos }).ready();
  const todoArr = Todos.find({ _id: { $in: todos } }).fetch();
  return { ready, todoArr };
})(ProjectStatusBar);
