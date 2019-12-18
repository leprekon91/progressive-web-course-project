import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';

function SingleProjectPage({ ready, project, todos }) {
  return (
    <div>
      <pre>{JSON.stringify(project, null, 4)}</pre>
    </div>
  );
}

export default withTracker(({ projectId }) => {
  const ready = Meteor.subscribe('projects.single', { projectId }).ready();
  const project = Projects.findOne({ _id: projectId });
  const todos = [];
  return { ready, project, todos };
})(SingleProjectPage);
