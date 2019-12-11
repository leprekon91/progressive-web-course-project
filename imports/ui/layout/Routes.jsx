import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Login from '../pages/Login.jsx';

function Routes() {
  return (
    <Router>
      <div>
        <NavBar />
        <br />
        <br />
        <Switch>
          <Route path="/login">
            <Login />
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
