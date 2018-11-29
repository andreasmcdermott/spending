import React from 'react';
import { render } from 'react-dom';
import { createMemorySource, createHistory, LocationProvider, Location } from '@reach/router';
import { getCurrentPage, setCurrentPage } from './localStorage';
import { addAccountsCollection } from './accounts/collection';
import { addCategoriesCollection } from './categories/collection';
import App from './App';
import DatabaseLoader from './components/DatabaseLoader';
import './styles.css';

const createRootNode = () => {
  const el = document.createElement('DIV');
  document.body.prepend(el);
  return el;
};

addAccountsCollection();
addCategoriesCollection();

const root = createRootNode();
const source = createMemorySource(getCurrentPage() || '/');
const history = createHistory(source);

render(
  <LocationProvider history={history}>
    <DatabaseLoader>
      <App />

      <Location>
        {({ location }) => {
          setCurrentPage(location.pathname);
          return null;
        }}
      </Location>
    </DatabaseLoader>
  </LocationProvider>,
  root
);
