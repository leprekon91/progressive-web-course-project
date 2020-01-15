/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

function ResetPassword({ token, loggingIn, authenticated }) {
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [loading, setloading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirm) {
      Accounts.resetPassword(token, password, (err) => {
        setloading(true);
        if (err) {
          alert(err);
        }
        setloading(false);
      });
    }
  };
  if (!loggingIn && authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Reset Password</h5>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputConfirm"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setconfirm(e.target.value)}
                    required
                  />
                  <label htmlFor="inputConfirm">Confirm Password</label>
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  {loading ? <i className="fas fa-spinner" /> : 'Reset Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTracker(({ token }) => {
  const loggingIn = Meteor.loggingIn();
  return {
    token,
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  };
})(ResetPassword);
