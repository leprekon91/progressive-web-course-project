import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import Todos from '../pages/Todos.jsx';
import Projects from '../pages/Projects.jsx';
import Profile from '../pages/Profile.jsx';
import VerifyEmail from '../pages/VerifyEmail.jsx';
import Home from '../pages/Home.jsx';

function Routes() {
  return (
    <Router>
      <div>
        <NavBar />
        <br />
        <br />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/verify-email">
            <VerifyEmail />
          </Route>
          <Route path="/todos">
            <Todos />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
