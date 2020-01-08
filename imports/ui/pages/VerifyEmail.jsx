import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VerifyEmail({ token }) {
  const [error, seterror] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    Accounts.verifyEmail(token, (err) => {
      seterror(err);
    });
  };

  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Verify Email</h5>
              {error === null ? (
                <p>Please press the button below to verify your email address</p>
              ) : (
                <p className="text-denger">{error.reason}</p>
              )}

              <form className="form-signin" onSubmit={onSubmit}>
                {Meteor.user() && Meteor.user().emails[0].verified ? (
                  <Link
                    to="/profile"
                    className="btn btn-lg btn-success btn-block text-uppercase"
                    type="submit"
                  >
                    Go To Your Profile
                  </Link>
                ) : (
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                    Verify Email Address
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
