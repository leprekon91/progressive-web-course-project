/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

function ForgotPassword() {
  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Send Reset Password Email</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>

                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  Send Reset Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
