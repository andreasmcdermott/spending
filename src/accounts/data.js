import { addCollection, getCollection, removeCollection } from '../utils/db';
import { createIdFromName } from '../utils/utils';
import { getCategoryById } from '../categories/data';
import CategoryTypes from '../categories/categoryTypes';

const createAccountCollection = accountId => {
  const collection = addCollection(accountId, { unique: ['id'], indices: ['category', 'date'] });
  // const transform = [
  //   {
  //     type: 'mapReduce',
  //     mapFunction: row => {
  //       console.log(row);
  //       return row;
  //     },
  //     reduceFunction: (...args) => {
  //       console.log(...args);
  //       return 0;
  //     }
  //   }
  // ];
  return collection;
};

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

export const importSpending = (accountId, rows) => {
  const collection = createAccountCollection(accountId);
  collection.insert(rows);
};

export const getTotalSpendingByCategory = accountId => {
  const collection = getCollection(accountId);
  const totalSpending = collection.mapReduce(
    row => {
      const category = getCategoryById(row.category);
      return {
        category: row.category,
        categoryType: category.type,
        amount: row.amount
      };
    },
    data =>
      data.reduce((totalPerCategory, row) => {
        if (row.categoryType === CategoryTypes.Spending) {
          totalPerCategory[row.category] = (totalPerCategory[row.category] || 0) + row.amount;
        }
        return totalPerCategory;
      }, {})
  );

  Object.keys(totalSpending).forEach(category => {
    totalSpending[category] = Math.round(totalSpending[category]);
  });
  return totalSpending;
};
