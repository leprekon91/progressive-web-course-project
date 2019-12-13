/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [logedIn, setLogedIn] = React.useState(!!Meteor.userId());

  if (logedIn) {
    return <Redirect to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        // eslint-disable-next-line no-alert
        alert(err);
      } else {
        setLogedIn(true);
      }
      setLoading(false);
    });
  };
  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputEmail">Username</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <br />
                <div className="custom-control custom-checkbox mb-3">
                  Don&apos;t have an account? &nbsp;
                  <Link to="/signup">Sign-up now!</Link>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <i className="fas fa-spinner" /> : 'Sign in'}
                </button>
                <hr className="my-4" />
                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                  <i className="fab fa-google mr-2" />
                  Sign in with Google
                </button>
                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                  <i className="fab fa-facebook-f mr-2" />
                  Sign in with Facebook
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
