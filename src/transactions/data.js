import { getCollection } from '../utils/db';
import { getCategory } from '../categories/data';
import CategoryTypes from '../enums/category-types';
import { sortBy } from '../utils/fns';

const createFilter = ({ period, category }) => {
  const filter = {};
  if (period) filters.period = { $eq: period };
  if (category) filters.category = { $eq: category };
  return filter;
};

export const importTransactions = (accountId, rows) => {
  getCollection(accountId).insert(rows);
};

export const updateTransactions = (accountId, rows) => {
  getCollection(accountId).update(rows);
};

export const getTransactions = (accountId, filters) =>
  getCollection(accountId).find(createFilter(filters));

export const getTransactionsByCategory = (accountId, period) => {
  const totalSpending = getTransactions(accountId, { period })
    .map(t => {
      const category = getCategory(t.category);
      return {
        category: t.category,
        categoryType: category.type,
        categoryName: category.name,
        color: category.color,
        amount: t.amount
      };
    })
    .filter(t => t.categoryType === CategoryTypes.Spending)
    .reduce((totalPerCategory, t) => {
      if (!totalPerCategory[t.category]) totalPerCategory[t.category] = { ...t };
      else totalPerCategory[t.category].amount += t.amount;
      return totalPerCategory;
    }, {});

  return Object.values(totalSpending)
    .map(item => {
      item.amount = Math.round(item.amount);
      return item;
    })
    .sort(sortBy('categoryName'));
};

export const getPeriods = accountId =>
  getCollection(accountId)
    .mapReduce(row => row.period, rows => [...new Set(rows)])
    .sort((p1, p2) => p2 - p1);
