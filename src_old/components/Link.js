import React from 'react';
import { Link as RouterLink } from '@reach/router';

const Link = ({ to, children }) =>
  <RouterLink to={to} getProps={() => ({ className: 'text-blue-dark no-underline' })}>
    {children}
  </RouterLink>;

export default Link;
