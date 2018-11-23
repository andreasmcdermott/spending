import { addCollection, getCollection } from '../utils/db';
import { createIdFromName } from '../utils/utils';
import { getCategoryById } from '../categories/data';
import CategoryTypes from '../categories/categoryTypes';
import ColumnTypes from './columnTypes';

const createAccountCollection = accountId => {
  const collection = addCollection(accountId, { unique: ['id'], indices: ['category', 'period'] });
  return collection;
};

export const getAccountById = id => getCollection('accounts').findOne({ id });

export const getAccounts = () => getCollection('accounts').find({});

export const addAccount = account => {
  if (!account.name || !account.type) throw new Error('Invalid account');
  account.id = createIdFromName(account.name);
  createAccountCollection(account.id);
  return getCollection('accounts').insert(account);
};

export const removeAccount = accountId => {
  const collection = getCollection('accounts');
  collection.removeWhere({ id: accountId });
};

export const setImportFormat = (accountId, importFormat) => {
  const accounts = getCollection('accounts');
  const account = accounts.findOne({ id: accountId });
  if (importFormat.columns.every(c => c.type !== ColumnTypes.Id)) {
    // Use uuid for id
    importFormat.columns.push({ name: '$uuid$', type: ColumnTypes.Id });
  }
  account.importFormat = importFormat;
  accounts.update(account);
};

export const importSpending = (accountId, rows) => {
  const collection = getCollection(accountId);
  collection.insert(rows);
};

export const updateRows = (accountId, rows) => {
  const collection = getCollection(accountId);
  collection.update(rows);
};

export const getSpendingByCategory = (accountId, period = null) => {
  const collection = getCollection(accountId);
  const rows = collection.find(!!period ? { period: { $eq: period } } : {});
  const totalSpending = rows
    .map(row => {
      const category = getCategoryById(row.category);
      return {
        category: row.category,
        categoryType: category.type,
        categoryName: category.name,
        color: category.color,
        amount: row.amount
      };
    })
    .reduce((totalPerCategory, row) => {
      if (row.categoryType !== CategoryTypes.Spending) return totalPerCategory;

      if (!totalPerCategory[row.category]) totalPerCategory[row.category] = { ...row };
      else totalPerCategory[row.category].amount += row.amount;
      return totalPerCategory;
    }, {});

  Object.keys(totalSpending).forEach(category => {
    totalSpending[category].amount = Math.round(totalSpending[category].amount);
  });

  return totalSpending;
};

export const getPeriods = accountId => {
  const collection = getCollection(accountId);
  return collection
    .mapReduce(row => row.period, rows => [...new Set(rows)])
    .sort((p1, p2) => p2 - p1);
};

export const getRows = (accountId, { period, category }) => {
  const collection = getCollection(accountId);
  const filters = {};
  if (period) {
    filters.period = { $eq: period };
  }
  if (category) {
    filters.category = { $eq: category };
  }
  return collection.find(filters);
};
