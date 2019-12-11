import React from 'react';

function VerifyEmail() {
  return (
    <div className="container accounts-form">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Verify Email</h5>
              <form className="form-signin">
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  {/* <i class="fas fa-spinner fa-2x"/> */}
                  Verify Email Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
