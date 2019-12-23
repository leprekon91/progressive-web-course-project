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
            <div className="col-12">
              <UserAvatar />
            </div>
          </div>
          <div className="row">
            <div className="col-9">News</div>
            <div className="col-3">Log</div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col text-center">
            <img src="/home-banner.png" className="img-fluid" alt="todoer banner" />
          </div>
        </div>
      )}
    </div>
  );
}

Home.propTypes = { user: PropTypes.object };
Home.defaultProps = { user: null };

export default Home;
