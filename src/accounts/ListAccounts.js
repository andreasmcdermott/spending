import React from 'react';
import { Link } from '@reach/router';

const ListAccounts = ({ accounts = [] }) =>
  <div>
    <ul>
      {accounts.map(account =>
        <li>
          {account.name}
        </li>
      )}
    </ul>
    <Link to="/accounts/new">New Account</Link>
  </div>;

export default ListAccounts;
