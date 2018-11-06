import React from 'react';
import { Router, Link } from '@reach/router';
import Dashboard from './dashboard/Dashboard';
import Accounts from './accounts/Accounts';
import ListAccounts from './accounts/ListAccounts';
import AccountForm from './accounts/AccountForm';

const App = () =>
  <div>
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="accounts">Accounts</Link>
    </nav>
    <main>
      <Router>
        <Dashboard path="/" />
        <Accounts path="accounts">
          <ListAccounts path="/" />
          <AccountForm path="new" />
          <AccountForm path="edit/:accountId" />
        </Accounts>
      </Router>
    </main>
  </div>;

export default App;
