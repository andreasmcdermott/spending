import { addCollection } from '../utils/db';

export const addTransactionsCollection = accountId => {
  addCollection(accountId, { unique: ['id'], indices: ['category', 'period'] });
};
