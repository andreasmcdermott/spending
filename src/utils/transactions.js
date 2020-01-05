import { get } from 'svelte/store';
import { categories } from '../categories/store';
import CategoryTypes from '../enums/category-types';

let categoriesMap = null;
const getCategoriesMap = () => {
  if (!categoriesMap) {
    categoriesMap = get(categories).reduce((acc, c) => {
      acc[c.id] = c;
      return acc;
    }, {});
  }
  return categoriesMap;
};

export const filterByCategoryType = type => ({ category }) =>
  getCategoriesMap()[category].type === type;

export const filterByPeriod = period => transaction => transaction.period === period;

export const getFormattedAmount = transaction => {
  let amount = Math.round(transaction.amount);
  if (getCategoriesMap()[transaction.category].type === CategoryTypes.Spending) {
    amount *= -1;
  }
  return amount;
};
