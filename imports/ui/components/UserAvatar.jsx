import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactLetterAvatar from './LetterAvatar.jsx';

function UserAvatar({ user }) {
  return (
    <div className="card p-2">
      <div className="media">
        {!!user && <ReactLetterAvatar name={user.username} />}
        <div className="media-body ml-3">
          <h2 className="">{!!user && user.username}</h2>
          <small className="text-info">Wellcome to the todoer app!</small>
        </div>
      </div>
    </div>
  );
}

export default withTracker(() => ({ user: Meteor.user() }))(UserAvatar);
