import React from 'react';
import { Router, Link } from '@reach/router';
import Dashboard from './dashboard/components/Dashboard';
import Accounts from './accounts/components/Accounts';
import ListAccounts from './accounts/components/ListAccounts';
import NewAccount from './accounts/components/NewAccount';
import DefineImportFormat from './accounts/components/DefineImportFormat';
import Account from './accounts/components/Account';
import Categories from './categories/components/Categories';
import ImportTransactions from './transactions/components/ImportTransactions';
import UpdateTransactions from './transactions/components/UpdateTransactions';

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
        </Accounts>
        <ImportTransactions path="transactions/:accountId/import" />
        <UpdateTransactions path="transactions/:accountId/update" />
      </Router>
    </main>
  </div>;

export default App;
