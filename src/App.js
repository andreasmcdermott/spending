import React from 'react';
import { Router, Link } from '@reach/router';
import Dashboard from './dashboard/Dashboard';
import Accounts from './accounts/Accounts';
import ListAccounts from './accounts/ListAccounts';
import NewAccount from './accounts/NewAccount';
import Account from './accounts/Account';
import DefineImportFormat from './accounts/DefineImportFormat';

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
          <NewAccount path="new" />
          <Account path=":accountId" />
          <DefineImportFormat path=":accountId/define-import-format" />
        </Accounts>
      </Router>
    </main>
  </div>;

export default App;
