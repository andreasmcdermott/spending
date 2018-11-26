import React from 'react';
import { Link } from '@reach/router';
import ListAccounts from '../accounts/components/ListAccounts';
import Title from './Title';

const Nav = () =>
  <div className="flex-none bg-grey-lighter max-h-screen">
    <div className="p-4 flex flex-col h-full">
      <Title>Accounts</Title>
      <ListAccounts />
      <div className="mt-2 pt-2 border-t text-xs">
        <Link to="categories">Categories</Link>
      </div>
    </div>
  </div>;

export default Nav;
