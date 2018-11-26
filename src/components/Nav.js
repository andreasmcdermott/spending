import React from 'react';
import NavLink from './NavLink';
import ListAccounts from '../accounts/components/ListAccounts';
import Title from './Title';

const Nav = () =>
  <div className="flex-none bg-black text-white max-h-screen">
    <div className="p-4 flex flex-col h-full">
      <Title>Accounts</Title>
      <ListAccounts />
      <div className="mt-2 pt-2 border-t text-xs">
        <NavLink to="categories">Categories</NavLink>
      </div>
    </div>
  </div>;

export default Nav;
