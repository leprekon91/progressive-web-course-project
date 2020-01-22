import React, { useState } from "react";
import { Link } from "react-router-dom";

function VerifyEmail({ token }) {
  const [error, seterror] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    Accounts.verifyEmail(token, err => {
      if (err) {
        seterror(err);
      }
    });
  };

  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5
                className={`card-title text-center ${!!error && "text-danger"}`}
              >
                Verify Email {!!error && "Error"}
              </h5>
              {!error ? (
                <p>
                  Please press the button below to verify your email address
                </p>
              ) : (
                <p className="text-denger">
                  {!!error ? error.reason : "An unknown error accured."}
                </p>
              )}

              <form className="form-signin" onSubmit={onSubmit}>
                {Meteor.user() && Meteor.user().emails[0].verified ? (
                  <Link
                    to="/profile"
                    className={`btn btn-lg btn-${
                      error===null ? "success" : "danger"
                    } btn-block text-uppercase`}
                    type="submit"
                  >
                    Go To Your Profile
                  </Link>
                ) : (
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
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
