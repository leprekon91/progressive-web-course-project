/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

function Signup({ loggingIn, authenticated }) {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [loading, setloading] = useState(false);

  if (!loggingIn && authenticated) {
    return <Redirect to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    if (password === confirm) {
      Accounts.createUser({ username, email, password }, (err) => {
        if (err) {
          // eslint-disable-next-line no-alert
          alert(err);
        }
        setloading(false);
      });
    }
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    setloading(true);
    Meteor.loginWithGoogle({}, (err) => {
      if (err) {
        alert(err);
      } else {
        Meteor.call('users.googleUser', (error) => {
          if (error) {
            alert(error);
          }
        });
      }
    });
  };

  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUname"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    disabled={loading}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputUname">Username</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    disabled={loading}
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
                    disabled={loading}
                    required
                  />
                  <label htmlFor="inputConfirm">Confirm Password</label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                  Already have an account? &nbsp;
                  <Link to="/login">Sign-in!</Link>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={loading}
                >
                  Sign up
                </button>
                <hr className="my-4" />
                <button
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  type="button"
                  onClick={googleSignIn}
                >
                  <i className="fab fa-google mr-2" />
                  Sign up with Google
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
})(Signup);
