import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UserAvatar from '../components/UserAvatar.jsx';

function Profile({ user }) {
  const [loading, setloading] = React.useState(false);
  const email = user.emails[0];
  const resend = () => {
    setloading(true);
    Meteor.call('users.resendVerification', (err) => {
      if (err) {
        alert(err);
      }
      setloading(false);
    });
  };
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
        <li className="list-group-item" key={email.address}>
          {email.address}
          <span
            className={`badge badge-${email.verified ? 'success' : 'secondary'} float-right m-2`}
          >
            {email.verified ? 'verified' : 'not verified'}
          </span>
          <button
            type="button"
            className={`float-right btn btn-${!loading ? 'default' : 'info'}`}
            onClick={resend}
          >
            {loading ? <i className="fas fa-spinner" /> : <i className="fas fa-paper-plane" />}
            &nbsp;
            {!loading ? 'Resend Verification Email' : 'Sending Email'}
          </button>
        </li>
      </ul>
    </div>
  );
}

Profile.propTypes = { user: PropTypes.object.isRequired };

export default withTracker(() => ({ user: Meteor.user() }))(Profile);
