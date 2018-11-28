import { getCollection } from '../utils/db';
import { getCategory } from '../categories/data';
import CategoryTypes, { getNameByValue } from '../enums/category-types';
import { sortBy, memoize } from '../utils/fns';
import { getRandomColor } from '../enums/colors';

const createFilter = ({ period, category }) => {
  const filter = {};
  if (period) filter.period = { $eq: period };
  if (category) filter.category = { $eq: category };
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

export const getTransactionsByCategory = memoize((accountId, period) => {
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
    .map(item => ({
      value: Math.round(item.amount),
      color: item.color,
      label: item.categoryName
    }))
    .sort(sortBy('label'));
});

const categoryTypeColors = {
  [CategoryTypes.Income]: 'limegreen',
  [CategoryTypes.Spending]: 'tomato'
};
export const getTransactionsByCategoryType = memoize((accountId, period) => {
  const totalSpending = getTransactions(accountId, { period })
    .map(t => {
      const category = getCategory(t.category);
      return {
        categoryType: category.type,
        color: categoryTypeColors[category.type],
        amount: t.amount
      };
    })
    .filter(t => t.categoryType !== CategoryTypes.Ignored)
    .reduce((totalPerCategoryType, t) => {
      if (!totalPerCategoryType[t.categoryType]) totalPerCategoryType[t.categoryType] = { ...t };
      else totalPerCategoryType[t.categoryType].amount += t.amount;
      return totalPerCategoryType;
    }, {});

  return Object.values(totalSpending)
    .map(item => ({
      value: Math.round(item.amount),
      label: getNameByValue(item.categoryType),
      color: item.color
    }))
    .sort(sortBy('label'));
});

export const getPeriods = accountId =>
  getCollection(accountId)
    .mapReduce(row => row.period, rows => [...new Set(rows)])
    .sort((p1, p2) => p2 - p1);
