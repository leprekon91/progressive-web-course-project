import React from 'react';
import { Route } from 'react-router-dom';

function Todos() {
  // eslint-disable-next-line no-restricted-globals
  const params = location.pathname.split('/');
  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div
          className={`col-sm-9 ${
            params[params.length - 1] !== 'todos' ? 'd-none d-sm-block' : ''
          } border `}
        >
          Todos List
        </div>
        <div className="col-xs-12 col-sm-3 border">
          <Route
            exact
            path="/todos/:todoid"
            component={({ match }) => <h1>{match.params.todoid}</h1>}
          />
        </div>
      </div>
    </div>
  );
}

export default Todos;
