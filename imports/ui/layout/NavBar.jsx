import React from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import CustomLink from './CustomLink.jsx';

function NavBar({ user }) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-light">
      <Link className="navbar-brand" to="/">
        <img src="/NavLogo.png" height="30" alt="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          {user && (
            // eslint-disable-next-line react/jsx-fragments
            <React.Fragment>
              <CustomLink to="/todos" label="My Todos" />
              <CustomLink to="/projects" label="Projects" />
            </React.Fragment>
          )}
        </ul>
        <ul className="navbar-nav">
          {user ? (
            // eslint-disable-next-line react/jsx-fragments
            <React.Fragment>
              <CustomLink to="/profile" label="Profile" />
              <CustomLink to="/" label="Logout" />
            </React.Fragment>
          ) : (
            <CustomLink to="/login" label="Login" />
          )}
        </ul>
      </div>
    </nav>
  );
}

export default withTracker(() => ({ user: Meteor.user() }))(NavBar);
