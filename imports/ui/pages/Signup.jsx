/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUname"
                    className="form-control"
                    placeholder="Username"
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
                    required
                  />
                  <label htmlFor="inputConfirm">Confirm Password</label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                  Already have an account? &nbsp;
                  <Link to="/login">Sign-in!</Link>
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  Sign up
                </button>
                <hr className="my-4" />
                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit">
                  <i className="fab fa-google mr-2" />
                  Sign up with Google
                </button>
                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit">
                  <i className="fab fa-facebook-f mr-2" />
                  Sign up with Facebook
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
