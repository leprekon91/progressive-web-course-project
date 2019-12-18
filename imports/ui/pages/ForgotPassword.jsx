/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);
  const [emailSent, setemailSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);

    Accounts.forgotPassword({ email }, (err) => {
      console.log('got here');
      if (err) {
        alert(err);
      } else {
        setemailSent(true);
      }
      setloading(false);
    });
  };
  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Send Reset Password Email</h5>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <p className="text-info">
                  {emailSent &&
                    `Reset password email was sent to ${email}. Check the inbox for further instructions`}
                </p>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  {loading ? <i className="fas fa-spinner" /> : 'Send Reset Email'}
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
