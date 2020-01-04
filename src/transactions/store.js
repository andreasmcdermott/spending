import { derived } from 'svelte/store';
import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';

const mapTransaction = t => {
  t.date = new Date(t.date);
  return t;
};

class TransactionsCollection extends Collection {
  constructor() {
    super('transactions', false);
  }

  getAllSorted() {
    return this.getAll(sortBy('period')).map(mapTransaction);
  }

  getFiltered(filter, sort) {
    return super.getFiltered(filter, sort).map(mapTransaction);
  }

  getAllForAccount(id) {
    return this.getFiltered({ accountId: id }, sortBy('date'));
  }

  getAllForAccountInPeriod(id, period) {
    return this.getFiltered({ accountId: id, period }, sortBy('date'));
  }

  getAllInPeriod(period) {
    return this.getFiltered({ period }, sortBy('date'));
  }

  getAllPeriodsForAccount(id) {
    const obj = this.getAllForAccount(id)
      .map(t => t.period)
      .reduce((acc, p) => ({ ...acc, [p]: true }), {});
    return Object.keys(obj);
  }
}

const collection = new TransactionsCollection();

export const getAllPeriodsForAccount = accountId => {
  return collection.getAllPeriodsForAccount(accountId);
};

export const getTransactionForAccount = accountId => {
  const dynamicView = collection.createDynamicView(`account-${accountId}`);
  dynamicView.applyFind({ accountId }, `find-accountId-${accountId}`);

  return derived(collection.store, () => dynamicView.data());
};

export const getTransactionForAccountAndPeriod = (accountId, period) => {
  const dynamicView = collection.createDynamicView(`account-${accountId}`);
  dynamicView.removeFilters();
  dynamicView.applyFind({ accountId, period: parseInt(period, 10) }, 'find-account-period');
  return derived(collection.store, () => dynamicView.data());
};

export const importTransactions = (accountId, transactions) => {
  collection.insertMany(
    transactions.map(t => {
      t.accountId = accountId;
      return t;
    })
  );
};

export const updateTransactions = (accountId, transactions) => {};
