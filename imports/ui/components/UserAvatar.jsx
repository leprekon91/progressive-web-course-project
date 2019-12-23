import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactLetterAvatar from './LetterAvatar.jsx';

function UserAvatar({ ready, user }) {
  if (!ready) {
    return 'Loading...';
  }
  if (!user) {
    return 'none';
  }
  return (
    <div title={user.username}>
      <ReactLetterAvatar name={user.username} />
    </div>
  );
}

export default withTracker(({ username }) => {
  return {
    ready: username ? Meteor.subscribe('userAvatar', { username }).ready() : true,
    user: username ? Meteor.users.findOne({ username }) : Meteor.user(),
  };
})(UserAvatar);
