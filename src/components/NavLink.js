import React from 'react';
import { Link } from '@reach/router';

const NavLink = ({ to, children }) =>
  <Link to={to} getProps={() => ({ className: 'text-blue-lightest no-underline' })}>
    {children}
  </Link>;

export default NavLink;
