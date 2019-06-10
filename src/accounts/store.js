import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';

class AccountsCollection extends Collection {
  getAllSorted() {
    return this.getAll(sortBy('name'));
  }
}

const collection = new AccountsCollection('accounts');

export const accounts = {
  subscribe: collection.store.subscribe,
};

export const createAccount = account => {
  collection.insert(account);
};
