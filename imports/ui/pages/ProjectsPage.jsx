import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Projects } from '../../api/projects/projects';
import ProjectStatusBar from '../components/ProjectStatusBar';
import { Link } from 'react-router-dom';
import AddProjectDialog from '../components/AddProjectDialog';

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
              <AddProjectDialog />
            </div>
          </div>
        )}
        <div id="accordion" className="col">
          {projects.map((p, index) => (
            <div className="card" key={p._id}>
              <div
                className="card-header"
                id={`heading${p._id}`}
                data-toggle="collapse"
                data-target={`#${p._id}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={p._id}
              >
                <h5 className="mb-0">{p.title}</h5>
                <br />
                <ProjectStatusBar todos={p.todos} />
              </div>

              <div
                id={p._id}
                className={`collapse ${index === 0 && 'show'}`}
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body">
                  <p className="card-text">
                    {p.description}
                    <br />
                    {`Participants: ${p.sharedWithIds.length + 1}`}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {`Created At: ${p.createdAt.toLocaleString('he-IL')}`}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {`Due Date: ${p.dueDate.toLocaleString('he-IL')}`}
                    </small>
                  </p>
                  <p className="card-text text-right">
                    <Link to={`/project/${p._id}`} className="btn btn-primary">
                      Go To Project
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <AddProjectDialog />
        </div>
      </div>
    </div>
  );
}

export default withTracker(() => {
  const ready = Meteor.subscribe('projects.my').ready();
  const projects = Projects.find({}).fetch();
  return { ready, projects };
})(ProjectsPage);
