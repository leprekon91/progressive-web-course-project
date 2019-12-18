/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function ProjectStatusBar({ todos }) {
  const todoPercent = todos.filter((t) => t.status === 'todo').length / todos.length;
  const inprogPercent = todos.filter((t) => t.status === 'inprog').length / todos.length;
  const donePercent = todos.filter((t) => t.status === 'done').length / todos.length;
  return (
    <div className="progress">
      {todos.length !== 0 && (
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

export default ProjectStatusBar;
