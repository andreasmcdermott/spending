import React from 'react';
import { Router } from '@reach/router';
import Nav from './components/Nav';
import Dashboard from './dashboard/components/Dashboard';
import Accounts from './accounts/components/Accounts';
import NewAccount from './accounts/components/NewAccount';
import DefineImportFormat from './accounts/components/DefineImportFormat';
import Account from './accounts/components/Account';
import Categories from './categories/components/Categories';
import Transactions from './transactions/components/Transactions';
import TransactionsHome from './transactions/components/TransactionsHome';
import ImportTransactions from './transactions/components/ImportTransactions';
import UpdateTransactions from './transactions/components/UpdateTransactions';

const App = () =>
  <div className="min-h-screen max-h-screen">
    <main className="flex min-h-screen max-h-screen">
      <Nav />
      <div className="flex-auto overflow-auto">
        <div className="p-4">
          <Router>
            <Dashboard path="/" />
            <Categories path="categories" />
            <Accounts path="accounts" />
            <NewAccount path="accounts/new" />
            <Account path="accounts/:accountId" />
            <DefineImportFormat path="accounts/:accountId/define-import-format" />
            <Transactions path="transactions">
              <TransactionsHome path="/" />
              <ImportTransactions path=":accountId/import" />
              <UpdateTransactions path=":accountId/update" />
            </Transactions>
          </Router>
        </div>
      </div>
    </main>
  </div>;

export default App;
