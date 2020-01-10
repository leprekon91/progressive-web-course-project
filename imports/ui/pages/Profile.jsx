import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UserAvatar from '../components/UserAvatar.jsx';

function Profile({ user }) {
  const [loading, setloading] = React.useState(false);
  const [changingPass, setchangingPass] = React.useState(false);
  const [oldpass, setoldpass] = React.useState('');
  const [newpass, setnewpass] = React.useState('');
  const [confirmpass, setconfirmpass] = React.useState('');
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

  const changePassword = (e) => {
    e.preventDefault();
    if (newpass === confirmpass) {
      setchangingPass(true);
      Accounts.changePassword(oldpass, newpass, (err) => {
        if (err) {
          alert(err);
        } else {
          setoldpass('');
          setnewpass('');
          setconfirmpass('');
        }
        setchangingPass(false);
      });
    }
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
      <ul className="list-group mt-3 mb-3">
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

      <form className="p-3 card" onSubmit={changePassword}>
        <div className="card-body">
          Change your password:
          <input
            disabled={changingPass}
            value={oldpass}
            onChange={(e) => setoldpass(e.target.value)}
            className="form-control m-1"
            type="password"
            required
            placeholder="Old Password"
          />
          <input
            disabled={changingPass}
            value={newpass}
            onChange={(e) => setnewpass(e.target.value)}
            className="form-control m-1"
            type="password"
            required
            placeholder="New Password"
          />
          <input
            disabled={changingPass}
            value={confirmpass}
            onChange={(e) => setconfirmpass(e.target.value)}
            className="form-control m-1"
            type="password"
            required
            placeholder="Confirm Password"
          />
        </div>
        <button disabled={changingPass} type="submit" className="btn btn-link card-link">
          Submit
        </button>
      </form>
    </div>
  );
}

Profile.propTypes = { user: PropTypes.object.isRequired };

export default withTracker(() => ({ user: Meteor.user() }))(Profile);
