import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import './fixtures.js';

Meteor.startup(() => {
  Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://localhost:3000';
});
