import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from '../imports/ui/App.jsx';


Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
