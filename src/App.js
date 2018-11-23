import React from 'react';
import { Router, Link } from '@reach/router';
import Dashboard from './dashboard/Dashboard';
import Accounts from './accounts/Accounts';
import ListAccounts from './accounts/ListAccounts';
import NewAccount from './accounts/NewAccount';
import Account from './accounts/Account';
import Import from './accounts/Import';
import DefineImportFormat from './accounts/DefineImportFormat';
import Categories from './categories/Categories';

const App = () =>
  <div>
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="accounts">Accounts</Link>
      <Link to="categories">Categories</Link>
    </nav>
    <main>
      <Router>
        <Dashboard path="/" />
        <Categories path="categories" />
        <Accounts path="accounts">
          <ListAccounts path="/" />
          <NewAccount path="new" />
          <Account path=":accountId" />
          <DefineImportFormat path=":accountId/define-import-format" />
          <Import path=":accountId/import" />
        </Accounts>
      </Router>
    </main>
  </div>;

export default App;
