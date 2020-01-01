import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import Todos from '../pages/Todos.jsx';
import ProjectsPage from '../pages/ProjectsPage.jsx';
import Profile from '../pages/Profile.jsx';
import VerifyEmail from '../pages/VerifyEmail.jsx';
import Home from '../pages/Home.jsx';
import SingleProjectPage from '../pages/SingleProjectPage.jsx';
import Authenticated from './Authenticated.jsx';

function Routes({ loggingIn, authenticated }) {
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
          <Route
            exact
            path="/reset-password/:token"
            component={({ match }) => <ResetPassword token={match.params.token} />}
          />
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route
            exact
            path="/verify-email/:token"
            component={({ match }) => <VerifyEmail token={match.params.token} />}
          />
          <Authenticated
            path="/todos"
            component={() => <Todos />}
            loggingIn={loggingIn}
            authenticated={authenticated}
          />
          <Route exact path="/projects" component={() => <ProjectsPage />} />
          <Route
            exact
            path="/project/:projectId"
            component={({ match }) => <SingleProjectPage projectId={match.params.projectId} />}
          />
          <Route exact path="/profile" component={() => <Profile />} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
