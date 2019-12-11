import React from 'react';
import CustomLink from './CustomLink';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <CustomLink to="/" label="Home" />
          <CustomLink to="/about" label="About" />
          <CustomLink to="/users" label="Users" />
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
