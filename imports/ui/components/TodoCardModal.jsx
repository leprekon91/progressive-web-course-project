import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar.jsx';
import AssignTodoMenu from './AssignTodoMenu.jsx';

function TodoCardModal({ todo }) {
  React.useEffect(() => {
    $(`#Modal${todo._id}`).modal('hide');
    return () => {
      $(`#Modal${todo._id}`).modal('hide');
    };
  });
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

  const removeTodo = (e) => {
    e.preventDefault();
    if (confirm('Are you sure? this can not be undone!')) {
      $(`#Modal${todo._id}`).modal('hide');
      Meteor.call('todo.remove', { todoId: todo._id }, (err) => {
        if (err) {
          alert(err);
        }
      });
    }
  };

  return (
    <div className="text-dark">
      <div
        className={`w-100 container border text-white bg-${getTodoBadge(status)} rounded`}
        data-toggle="modal"
        data-target={`#Modal${todo._id}`}
      >
        <div className="p-3 row">
          <div className="col">
            <h5>{title}</h5>
          </div>
          <div className="col text-center">
            <UserAvatar username={assignedName} flex size={10} />
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
              <div className="p-3 w-100">
                <span className="d-flex w-100 justify-content-start align-items-center">
                  Created By&nbsp;
                  <UserAvatar username={creatorName} />
                  &nbsp;
                  {creatorName}
                </span>
                {assignedName && (
                  <span>
                    {Meteor.userId() === todo.creatorId ? (
                      <AssignTodoMenu todo={todo}>
                        <span className="d-flex w-100 justify-content-start align-items-center dropdown-toggle">
                          Assignee: &nbsp;
                          <UserAvatar username={assignedName} />
                          &nbsp;
                          {assignedName}
                        </span>
                      </AssignTodoMenu>
                    ) : (
                      <span className="d-flex w-100 justify-content-start align-items-center">
                        Assignee: &nbsp;
                        <UserAvatar username={assignedName} />
                        &nbsp;
                        {assignedName}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {assignedId === Meteor.userId() && (
                <div className="btn-group" data-toggle="buttons">
                  <button
                    type="button"
                    disabled={Meteor.userId() !== assignedId}
                    onClick={() => {
                      Meteor.call('todos.changeStatus', { todoId: todo._id, status: 'todo' });
                      $(`#Modal${todo._id}`).modal('hide');
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
                      $(`#Modal${todo._id}`).modal('hide');
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
                      $(`#Modal${todo._id}`).modal('hide');
                    }}
                    className={`btn btn${status === 'done' ? '' : '-outline'}-success`}
                  >
                    Done
                  </button>
                </div>
              )}
              {todo.creatorId === Meteor.userId() && (
                <button type="button" className="btn btn-danger" onClick={removeTodo}>
                  Delete This Task
                </button>
              )}
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
