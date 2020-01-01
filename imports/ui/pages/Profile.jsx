import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserAvatar from '../components/UserAvatar.jsx';

function Profile({ user }) {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col">
          <div className="alert alert-light d-flex justify-content-start align-center" role="alert">
            <UserAvatar size={50} />
            &nbsp;
            <span className="m-3">{Meteor.user().username}</span>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {user.emails.map((item) => (
          <li className="list-group-item" key={item.address}>
            {item.address}
            <span className="badge badge-secondary float-right">
              {item.verified ? 'verified' : 'not verified'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withTracker(() => ({ user: Meteor.user() }))(Profile);
