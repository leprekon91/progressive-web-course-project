/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Projects } from '../../api/projects/projects';
import { Todos } from '../../api/todos/todos.js';
import TodoCardModal from '../components/TodoCardModal';

function SingleProjectPage({ ready, project, todos }) {
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
    <div className="container-fluid mt-3">
      <h4>{project.title}</h4>
      <p className="text-muted">{project.description}</p>
      <div className="row">
        <div className="col">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">To-do</div>
            <div className="card-body">
              {todoCollection.map((t) => (
                <TodoCardModal key={t._id} todo={t} />
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">In Progress</div>
            <div className="card-body">
              {inprogCollection.map((t) => (
                <TodoCardModal key={t._id} todo={t} />
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Done</div>
            <div className="card-body">
              {doneCollection.map((t) => (
                <TodoCardModal key={t._id} todo={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <pre className="d-none d-sm-block">{JSON.stringify({ project, todos }, null, 4)}</pre>
    </div>
  );
}

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
