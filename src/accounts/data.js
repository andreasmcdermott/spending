import { addCollection, getCollection } from '../utils/db';

const initializeStore = () => {
  addCollection('accounts', { unique: ['id', 'name'] });
};

initializeStore();

const createIdFromName = name =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]+/, '');

export const getAccountById = id => getCollection('accounts').findOne({ id });

export const getAccounts = () => getCollection('accounts').find({});

export const addAccount = account => {
  if (!account.name || !account.type) throw new Error('Invalid account');
  account.id = createIdFromName(account.name);
  return getCollection('accounts').insert(account);
};

export const setImportFormat = (accountId, importFormat) => {
  const accounts = getCollection('accounts');
  const account = accounts.findOne({ id: accountId });
  account.importFormat = importFormat;
  accounts.update(account);
};
