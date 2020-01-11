/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';
import CreateTodoForm from '../components/CreateTodoForm.jsx';
import TodoColumn from '../components/TodoColumn.jsx';

function SingleProjectPage({ ready, project }) {
  const [shareForm, setshareForm] = useState(false);
  const [email, setemail] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    Meteor.call('project.share', { projectId: project._id, email }, (err) => {
      if (err) alert(err);
    });
    setshareForm(false);
  };
  if (!ready) {
    return (
      <div className="m-3">
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
      {Meteor.userId() === project.managerId && (
        <span className="float-right">
          &nbsp;
          <CreateTodoForm projectTodo={project._id} />
        </span>
      )}
      {shareForm ? (
        <form onSubmit={onSubmit} className="float-right">
          <div className="form-group">
            <label>Email address of user to share with...</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share this email with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Share
          </button>
        </form>
      ) : (
        <i className="fas fa-share float-right btn btn-info" onClick={() => setshareForm(true)} />
      )}
      <small>
        <span className="badge badge-success">
          {`Created: ${project.createdAt.toLocaleString('he-IL')}`}
        </span>
      </small>
      &nbsp;&nbsp;&nbsp;
      <small>
        <span className="badge badge-danger">
          {`Due: ${project.dueDate.toLocaleString('he-IL')}`}
        </span>
      </small>
      <p className="text-muted">{project.description}</p>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <TodoColumn type="todo" todosIds={project.todos} projectId={project._id} />
        </div>
        <div className="col-md-4 col-sm-12">
          <TodoColumn type="inprog" todosIds={project.todos} projectId={project._id} />
        </div>
        <div className="col-md-4 col-sm-12">
          <TodoColumn type="done" todosIds={project.todos} projectId={project._id} />
        </div>
      </div>
    </div>
  );
}

SingleProjectPage.propTypes = {
  ready: PropTypes.bool.isRequired,
  project: PropTypes.object,
};

SingleProjectPage.defaultProps = { project: {} };

export default withTracker(({ projectId }) => {
  const ready = Meteor.subscribe('projects.single', { projectId }).ready();

  const project = Projects.findOne({ _id: projectId });
  return { ready, project };
})(SingleProjectPage);
