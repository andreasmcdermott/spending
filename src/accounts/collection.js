import { addCollection, getCollection } from '../utils/db';

const ACCOUNTS = 'accounts';

export const addAccountsCollection = () => {
  addCollection(ACCOUNTS, { unique: ['id', 'name'], indices: ['id'] });
};

export default () => getCollection(ACCOUNTS);
