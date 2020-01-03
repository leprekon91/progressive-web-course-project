import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';
import UserAvatar from './UserAvatar';

function AssignTodoMenu({ children, todo, possibleUsers, readyidList, readyUserList }) {
  if (!readyidList || !readyUserList) {
    return 'loading';
  }
  const assignTodo = (uid) => {
    Meteor.call('todo.assign', { todoId: todo._id, userId: uid });
  };
  return (
    <div>
      <div className="dropdown">
        <div
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {children}
        </div>
        {possibleUsers.length > 0 && (
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {possibleUsers.map((u) => {
              if (todo.assignedId === u._id) {
                return null;
              }
              return (
                <span
                  key={u._id}
                  className="d-flex w-100 justify-content-around align-items-center dropdown-item clickable"
                  onClick={() => assignTodo(u._id)}
                >
                  {u._id === Meteor.userId() ? (
                    'Assign Yourself'
                  ) : (
                    <>
                      <UserAvatar username={u.username} />
                      {` ${u.username} <${u.emails[0].address}>`}
                    </>
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default withTracker(({ todo }) => {
  const readyidList = Meteor.subscribe('projects.byTodo', { todoId: todo._id }).ready();
  const possibleUsers = Projects.find({ todos: todo._id })
    .fetch()
    .map((p) => {
      const sharedWith = p.sharedWithIds;

      sharedWith.push(p.managerId);
      return sharedWith;
    });
  const readyUserList = Meteor.subscribe('users.byArray', { users: possibleUsers.flat() }).ready();
  return {
    todo,
    possibleUsers: Meteor.users.find({ _id: { $in: possibleUsers.flat() } }).fetch(),
    readyidList,
    readyUserList,
  };
})(AssignTodoMenu);
