import { derived, writable } from 'svelte/store';
import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';
import uuid from '../utils/uuid';

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

export const getAllTransactions = () => {
  return collection.getAll();
};

export const getAllPeriodsForAccount = accountId => {
  return collection.getAllPeriodsForAccount(accountId);
};

export const getTransactionForAccount = (accountId, uid) => {
  const dynamicView = collection.createDynamicView(`account-${accountId}-${uid || uuid()}`);
  dynamicView.applyFind({ accountId });
  const dvStore = writable({});
  const { subscribe } = derived([collection.store, dvStore], () => dynamicView.data());
  return {
    subscribe,
    applyFilter: filters => {
      dynamicView.removeFilters();
      dynamicView.applyFind({ ...filters, accountId });
      dvStore.set({});
    }
  };
};

export const getTransactionForAccountAndPeriod = (accountId, period) => {
  const { subscribe, applyFilter } = getTransactionForAccount(accountId, 'period');
  const store = {
    subscribe,
    setPeriod: period => {
      if (typeof period === 'string') {
        period = parseInt(period, 10);
      }
      applyFilter({ period });
    }
  };
  store.setPeriod(period);
  return store;
};

export const importTransactions = (accountId, transactions) => {
  collection.insertMany(
    transactions.map(t => {
      t.accountId = accountId;
      return t;
    })
  );
};

export const updateTransactions = transactions => {
  collection.updateMany(transactions);
};
