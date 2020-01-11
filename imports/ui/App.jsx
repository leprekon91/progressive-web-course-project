import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Routes from './layout/Routes';

const App = ({ loggingIn, authenticated, conn }) => {
  if (!conn.connected && conn.retryCount === 0) {
    return (
      <div className="jumbotron text-center text-white bg-info m-3">
        <h1 className="display-4">
          <i className="fas fa-spinner" />
          <br />
          Loading
        </h1>
      </div>
    );
  }
  if (!conn.connected && conn.retryCount > 0) {
    return (
      <div className="jumbotron text-center text-white bg-danger m-3">
        <h1 className="display-4">
          <i className="fas fa-exclamation-triangle" />
          <br />
          An Error Accured
        </h1>
        <p className="lead">
          Your device has lost connection to the server. Please reload the page or contact our
          costumer support.
        </p>
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
