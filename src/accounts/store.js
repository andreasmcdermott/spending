import Collection from '../db/Collection';
import { sortBy, createIdFromName } from '../utils/fns';

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
  const id = createIdFromName(account.name);
  collection.insert({ ...account, importFormat: { columns: [] }, id });
};

export const getAccountById = id => collection.getOne(id);

export const removeAccount = id => collection.remove(id);
