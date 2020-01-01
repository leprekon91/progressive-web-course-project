import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import ReactLetterAvatar from './LetterAvatar.jsx';

function UserAvatar({ ready, user, size }) {
  if (!ready) {
    return 'Loading...';
  }
  if (!user) {
    return 'none';
  }
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  return (
    <div title={user.username} data-toggle="tooltip" data-placement="top">
      <ReactLetterAvatar name={user.username} flex size={size} />
    </div>
  );
}

UserAvatar.propTypes = {
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
  size: PropTypes.number,
};

UserAvatar.defaultProps = {
  user: {},
  size: 25,
};

export default withTracker(({ username }) => {
  return {
    ready: username ? Meteor.subscribe('userAvatar', { username }).ready() : true,
    user: username ? Meteor.users.findOne({ username }) : Meteor.user(),
  };
})(UserAvatar);
