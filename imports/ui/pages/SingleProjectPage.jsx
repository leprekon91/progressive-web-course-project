/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';
import { Todos } from '../../api/todos/todos.js';
import TodoCardModal from '../components/TodoCardModal.jsx';
import CreateTodoForm from '../components/CreateTodoForm.jsx';

function SingleProjectPage({ ready, project, todos }) {
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
  const todoCollection = todos.filter((todo) => todo.status === 'todo');
  const inprogCollection = todos.filter((todo) => todo.status === 'inprog');
  const doneCollection = todos.filter((todo) => todo.status === 'done');

  return (
    <React.Fragment>
      <div className="container-fluid mt-3 d-none d-md-block">
        <h4>{project.title}</h4>
        <small>
          <span className="badge badge-success">
            {`Created: ${project.createdAt.toLocaleString('he-IL')}`}
          </span>
        </small>
        &nbsp;&nbsp;&nbsp;
        <small>
          <span className="badge badge-danger">{`Due: ${project.dueDate.toLocaleString(
            'he-IL',
          )}`}</span>
        </small>
        {Meteor.userId() === project.managerId && <CreateTodoForm projectTodo={project._id} />}
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
        <p className="text-muted">{project.description}</p>
        <div className="row">
          <div className="col">
            <div className="card text-white  mb-3">
              <div className="card-header bg-warning">To-do</div>
              <div className="card-body">
                {todoCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white mb-3">
              <div className="card-header bg-primary">In Progress</div>
              <div className="card-body">
                {inprogCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-white mb-3">
              <div className="card-header bg-success">Done</div>
              <div className="card-body">
                {doneCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 d-md-none">
        <div className="row mb-1">
          <div className="col">
            {shareForm ? (
              <form onSubmit={onSubmit} className="w-100">
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setemail(e.target.email)}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Share
                </button>
              </form>
            ) : (
              <i
                className="fas fa-share float-right btn btn-sm btn-info"
                onClick={() => setshareForm(true)}
              />
            )}
          </div>
        </div>
        <div id="accordion">
          <div className="card text-white bg-warning">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  type="button"
                  className="btn w-100 text-light"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  To-do
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                {todoCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
                {todoCollection.length === 0 && 'No tasks in todo!'}
              </div>
            </div>
          </div>
          <div className="card text-white bg-primary">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  type="button"
                  className="btn w-100 text-light collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  In progress
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div className="card-body">
                {inprogCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
                {inprogCollection.length === 0 && 'No tasks in progress!'}
              </div>
            </div>
          </div>
          <div className="card text-white bg-success">
            <div className="card-header" id="headingThree">
              <h5 className="mb-0">
                <button
                  type="button"
                  className="btn w-100 text-light collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Done
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div className="card-body">
                {doneCollection.map((t) => (
                  <TodoCardModal key={t._id} todo={t} />
                ))}
                {doneCollection.length === 0 && 'No tasks are done yet!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

SingleProjectPage.propTypes = {
  ready: PropTypes.bool.isRequired,
  project: PropTypes.object,
  todos: PropTypes.array.isRequired,
};

SingleProjectPage.defaultProps = { project: {} };

export default withTracker(({ projectId }) => {
  const ready =
    Meteor.subscribe('projects.single', { projectId }).ready() &&
    Meteor.subscribe('todos.byProject', { projectId }).ready();

  const project = Projects.findOne({ _id: projectId });
  let todos = [];
  if (project) {
    todos = Todos.find({ _id: { $in: project.todos } }).fetch();
  }
  return { ready, project, todos };
})(SingleProjectPage);
