import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import TodoCounter from '../components/TodoCounter';

function CustomLink({ label, to, activeOnlyWhenExact }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  let link = <span>{label}</span>;
  switch (label) {
    case 'My Todos':
      link = (
        <span>
          <TodoCounter />
          {` ${label}`}
          &nbsp;
        </span>
      );
      break;
    case 'Projects':
      link = (
        <span>
          <i className="fas fa-th-list" />
          {` ${label}`}
        </span>
      );
      break;
    case 'Profile':
      link = (
        <span>
          <i className="fas fa-user-circle" />
          {` ${label}`}
        </span>
      );
      break;
    case 'Login':
      link = (
        <span>
          <i className="fas fa-sign-in-alt" />
          {` ${label}`}
        </span>
      );
      break;
    case 'Logout':
      link = (
        <span>
          <i className="fas fa-sign-out-alt" />
          {` ${label}`}
        </span>
      );
      break;
    default:
      break;
  }

  return (
    <li
      className={`nav-item ${match ? 'active' : ''}`}
      data-toggle="collapse"
      data-target="#navbarNav"
    >
      <Link className="nav-link" to={to}>
        {link}
      </Link>
    </li>
  );
}

CustomLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
};

CustomLink.defaultProps = { activeOnlyWhenExact: false };

export default CustomLink;
