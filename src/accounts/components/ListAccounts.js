import React from 'react';
import NavLink from '../../components/NavLink';
import { withData } from '../../utils/data';
import { getAccounts } from '../data';
import AccountTypes from '../../enums/account-types';

const AccountSection = ({ accounts, title }) =>
  <React.Fragment>
    <h3>
      {title}
    </h3>
    <ul className="list-reset mb-4">
      {accounts.map(account =>
        <li key={account.id} className="py-1">
          <NavLink to={`/accounts/${account.id}`}>
            {account.name}
          </NavLink>
        </li>
      )}
    </ul>
  </React.Fragment>;

const ListAccounts = ({ accounts = [] }) =>
  <React.Fragment>
    <AccountSection
      title="Checking Accounts"
      accounts={accounts.filter(a => a.type === AccountTypes.Checking)}
    />
    <AccountSection
      title="Savings Accounts"
      accounts={accounts.filter(a => a.type === AccountTypes.Saving)}
    />
    <AccountSection
      title="Credit Cards"
      accounts={accounts.filter(a => a.type === AccountTypes['Credit Card'])}
    />
    <span className="mt-auto">
      <NavLink to="/accounts/new">+ New Account</NavLink>
    </span>
  </React.Fragment>;

export default withData(() => ({ accounts: getAccounts() }))(ListAccounts);
