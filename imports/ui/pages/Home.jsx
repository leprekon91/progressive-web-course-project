/* eslint-disable react/jsx-fragments */
import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../components/UserAvatar.jsx';

function Home() {
  return (
    <div className="container-fluid mt-3">
      {Meteor.userId() ? (
        <>
          <div className="row">
            <div className="col-12 d-flex">
              Welcome,&nbsp;&nbsp;&nbsp;
              <UserAvatar />
              &nbsp;{!!Meteor.user() && Meteor.user().username}
            </div>
          </div>
          <div className="row">
            <div className="col-9">News</div>
            <div className="col-3">Log</div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col text-center p-0 pl-5 pr-5">
            <img
              src="/home-banner.png"
              className="img-fluid"
              style={{ maxHeight: 500 }}
              alt="todoer banner"
            />
          </div>
        </div>
      )}
    </div>
  );
}

Home.propTypes = { user: PropTypes.object };
Home.defaultProps = { user: null };

export default Home;
