import { addCollection, getCollection } from '../utils/db';

const ACCOUNTS = 'accounts';

export const addAccountsCollection = async () => {
  await addCollection(ACCOUNTS, { unique: ['id', 'name'], indices: ['id'] });
};

export default async () => getCollection(ACCOUNTS);
