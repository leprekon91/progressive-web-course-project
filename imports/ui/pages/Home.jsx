/* eslint-disable react/jsx-fragments */
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

function Home({ user }) {
  return (
    <div className="container-fluid mt-3">
      {Meteor.userId() ? (
        <>
          <div className="row">
            <div className="col-12">{`Hello, ${user.username}`}</div>
          </div>
          <div className="row">
            <div className="col-9">News</div>
            <div className="col-3">Log</div>
          </div>
        </>
      ) : (
        <div className="jumbotron">
          <img src="/home-banner.png" className="img-fluid" alt="todoer banner" />
        </div>
      )}
    </div>
  );
}

Home.propTypes = { user: PropTypes.object.isRequired };

export default withTracker(() => ({ user: Meteor.user() }))(Home);
