import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';

class AccountsCollection extends Collection {
  constructor() {
    super('accounts');
  }

  getAllSorted() {
    return this.getAll(sortBy('name'));
  }
}

const collection = new AccountsCollection();

export const accounts = {
  subscribe: collection.store.subscribe,
};

export const createAccount = account => {
  collection.insert(account);
};

export const getAccountById = id => collection.getOne(id);
