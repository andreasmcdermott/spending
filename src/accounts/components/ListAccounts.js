import React from 'react';
import { Link } from '@reach/router';
import { withData } from '../../utils/data';
import { getAccounts } from '../data';

const ListAccounts = ({ accounts = [] }) =>
  <div>
    <ul>
      {accounts.map(account =>
        <li key={account.id}>
          <Link to={`/accounts/${account.id}`}>
            {account.name}
          </Link>
        </li>
      )}
    </ul>
    <Link to="/accounts/new">New Account</Link>
  </div>;

export default withData(() => ({ accounts: getAccounts() }))(ListAccounts);
