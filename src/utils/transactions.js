import { createCachedMap } from '../utils/fns';
import { categories } from '../categories/store';
import { accounts } from '../accounts/store';
import CategoryTypes from '../enums/category-types';

const getCategoriesMap = createCachedMap(categories);
const getAccountsMap = createCachedMap(accounts);

export const filterByCategoryType = (type) => ({ category }) =>
  getCategoriesMap()[category].type === type;

export const filterByPeriod = (period) => (transaction) => transaction.period === period;

export const getFormattedAmount = (transaction) => {
  const account = getAccountsMap()[transaction.accountId];
  const category = getCategoriesMap()[transaction.category];
  return (
    Math.round(transaction.amount) *
    (account.flipAmount && category.type !== CategoryTypes.Income ? -1 : 1)
  );
};

export const formatForDisplay = (amount, flipAmount = false) => (flipAmount ? -1 : 1) * amount;
