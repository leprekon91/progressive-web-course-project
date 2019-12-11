import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';

function Routes() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/users">
            <h1>users</h1>
          </Route>
          <Route path="/">
            <div />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
