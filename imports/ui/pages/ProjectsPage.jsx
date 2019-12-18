import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Projects } from '../../api/projects/projects';

function ProjectsPage({ ready, projects }) {
  if (!ready) {
    return <div className="container mt-3">LOADING...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {projects.length === 0 && (
          <div className="card col-sm text-center">
            <div className="card-body">
              <h4 className="card-title ">No Projects to show...</h4>
              <button type="button" className="btn btn-primary">
                Create A Project
              </button>
            </div>
          </div>
        )}
        <div id="accordion" className="col">
          {projects.map((p) => (
            <div className="card">
              <div
                className="card-header"
                id="headingOne"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <h5 className="mb-0">{p.title}</h5>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body">{p.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {projects.map((p) => (
        <pre>{JSON.stringify(p, null, 2)}</pre>
      ))}
    </div>
  );
}

export default withTracker(() => {
  const ready = Meteor.subscribe('projects.my').ready();
  const projects = Projects.find({}).fetch();
  return { ready, projects };
})(ProjectsPage);
