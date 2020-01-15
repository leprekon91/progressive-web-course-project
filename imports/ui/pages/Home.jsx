/* eslint-disable react/jsx-fragments */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar.jsx';

function Home() {
  const [name, setname] = React.useState('');
  const [email, setemail] = React.useState('');
  const [message, setmessage] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    Meteor.call('contactUs', { name, email, message }, (err) => {
      if (err) {
        alert(err);
      } else {
        alert('Email was sent!');
      }
    });
  };
  return (
    <div className="container-fluid mt-3">
      {Meteor.userId() ? (
        <>
          <Redirect to="/todos" />
        </>
      ) : (
        <div className="row">
          <div className="col text-center p-0 pl-5 pr-5">
            <img
              src="/home-banner.png"
              className="img-fluid"
              style={{ maxHeight: 400 }}
              alt="todoer banner"
            />
            <form onSubmit={onSubmit}>
              <div className="card border-primary rounded-0 border-contact">
                <div className="card-header p-0">
                  <div className="bg-contact text-white text-center py-2">
                    <h3>
                      <i className="fa fa-envelope" />
                      &nbsp; Contact us
                    </h3>
                    <p className="m-0">We would love to hear what you think!</p>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user text-contact" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope text-contact" />
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-comment text-contact" />
                        </div>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <input
                      type="submit"
                      value="Send"
                      className="btn btn-primary bg-contact border-contact btn-block rounded-0 py-2"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

Home.propTypes = { user: PropTypes.object };
Home.defaultProps = { user: null };

export default Home;
