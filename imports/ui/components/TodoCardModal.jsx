import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar.jsx';

function TodoCardModal({ todo }) {
  const { title, description, createdAt, dueDate, creatorName, assignedName, status } = todo;
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
      <div className="card-body">
        <h5 className="card-title">
          {`${title} - `}
          <small>{createdAt.toLocaleString('he-IL')}</small>
        </h5>

        <p className="card-text">{description}</p>
        <small className={new Date() > dueDate ? 'text-danger' : ''}>
          {`Deadline: ${dueDate.toLocaleString('he-IL')}`}
        </small>

        <pre>{todo._id}</pre>
      </div>
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
        <small className={`badge badge-${getTodoBadge(status)}`}>{status}</small>
      </div>
    </div>
  );
}

TodoCardModal.propTypes = { todo: PropTypes.object.isRequired };

export default TodoCardModal;
