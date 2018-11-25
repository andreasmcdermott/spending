import React from 'react';
import { Link } from '@reach/router';

const LinkContainer = ({ children }) =>
  <span className="mx-2">
    {children}
  </span>;

const setCurrent = ({ isCurrent }) => ({
  color: isCurrent ? 'red' : 'blue'
});

const Nav = () =>
  <nav className="flex justify-center p-2 border-b">
    <LinkContainer>
      <Link to="/" getProps={setCurrent}>
        Dashboard
      </Link>
    </LinkContainer>
    <LinkContainer>
      <Link to="accounts">Accounts</Link>
    </LinkContainer>
    <LinkContainer>
      <Link to="categories">Categories</Link>
    </LinkContainer>
  </nav>;

export default Nav;
