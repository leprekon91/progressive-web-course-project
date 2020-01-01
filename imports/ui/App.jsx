import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Routes from './layout/Routes';

const App = ({ loggingIn, authenticated, conn }) => {
  if (!conn.connected && conn.retryCount > 0) {
    return (
      <div className="big-error-screen">
        <p className="text-danger">Error connecting to the server!</p>
      </div>
    );
  }
  return <Routes loggingIn={loggingIn} authenticated={authenticated} />;
};

App.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  conn: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  return {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
    conn: Meteor.status(),
  };
})(App);
