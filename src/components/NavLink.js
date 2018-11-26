import React from 'react';
import { Link } from '@reach/router';

const NavLink = ({ to, children }) =>
  <Link to={to} getProps={() => ({ className: 'text-white' })}>
    {children}
  </Link>;

export default NavLink;
