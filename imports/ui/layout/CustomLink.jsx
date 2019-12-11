import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

function CustomLink({ label, to, activeOnlyWhenExact }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li className={`nav-item ${match ? 'active' : ''}`}>
      <Link className="nav-link" to={to}>
        {label}
      </Link>
    </li>
  );
}

CustomLink.propTypes = { label: PropTypes.string.isRequired, to: PropTypes.string.isRequired };

export default CustomLink;
