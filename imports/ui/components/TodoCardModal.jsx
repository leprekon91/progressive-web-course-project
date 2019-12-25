import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar.jsx';

function TodoCardModal({ todo }) {
  const {
    title,
    description,
    createdAt,
    dueDate,
    creatorName,
    assignedId,
    assignedName,
    status,
  } = todo;
  const getTodoBadge = (s) => {
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
  return (
    <div className="card flex-column align-items-start">
      <div className="card-body w-100">
        <div className="w-100 card-title">
          <h5>{title}</h5>
          <div className="p-3 d-flex w-100 justify-content-between align-items-center">
            <span>
              <span>{createdAt.toLocaleDateString('he-IL')}</span>
              &nbsp;&minus;&nbsp;
              <span className={new Date() > dueDate ? 'text-danger' : ''}>
                {dueDate.toLocaleDateString('he-IL')}
                &nbsp;
                {new Date() > dueDate ? '(Deadline passed)' : ''}
              </span>
            </span>
            <small className={`badge badge-${getTodoBadge(status)}`}>{status}</small>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-toggle="modal"
              data-target={`#Modal${todo._id}`}
            >
              Details
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id={`Modal${todo._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="card-text">{description}</p>
              <div className="p-3 d-flex w-100 justify-content-between align-items-center">
                <small>
                  <small>
                    Created By:
                    <UserAvatar username={creatorName} />
                  </small>
                </small>
                {assignedName && (
                  <small>
                    Assignee:
                    <UserAvatar username={assignedName} />
                  </small>
                )}
              </div>

              <div className="btn-group" data-toggle="buttons">
                <button
                  type="button"
                  disabled={Meteor.userId() !== assignedId}
                  onClick={() => {
                    Meteor.call('todos.changeStatus', { todoId: todo._id, status: 'todo' });
                  }}
                  className={`btn btn${status === 'todo' ? '' : '-outline'}-warning`}
                >
                  To-do
                </button>
                <button
                  type="button"
                  disabled={Meteor.userId() !== assignedId}
                  onClick={() => {
                    Meteor.call('todos.changeStatus', { todoId: todo._id, status: 'inprog' });
                  }}
                  className={`btn btn${status === 'inprog' ? '' : '-outline'}-primary`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  disabled={Meteor.userId() !== assignedId}
                  onClick={() => {
                    Meteor.call('todos.changeStatus', { todoId: todo._id, status: 'done' });
                  }}
                  className={`btn btn${status === 'done' ? '' : '-outline'}-success`}
                >
                  Done
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TodoCardModal.propTypes = { todo: PropTypes.object.isRequired };

export default TodoCardModal;
