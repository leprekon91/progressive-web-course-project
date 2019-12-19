/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';

function SingleProjectPage({ ready, project, todos }) {
  if (!ready) {
    return (
      <div className="mt-3">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid mt-3">
      <h4>{project.title}</h4>
      <p className="text-muted">{project.description}</p>
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
