import { derived } from 'svelte/store';
import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';

class TransactionsCollection extends Collection {
  constructor() {
    super('transactions', false);
  }

  getAllSorted() {
    return this.getAll(sortBy('period'));
  }

  getAllForAccountInPeriod(id, period) {
    return this.getFiltered({ accountId: id, period }, sortBy('date'));
  }

  getAllInPeriod(period) {
    return this.getFiltered({ period }, sortBy('date'));
  }
}

const collection = new TransactionsCollection();

export const getTransactionForAccount = accountId => {
  const dynamicView = collection.createDynamicView(`account-${accountId}`);
  dynamicView.applyFind({ accountId }, `find-accountId-${accountId}`);
  dynamicView.applySimpleSort('date');
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
