// // import { getCollection } from '../utils/db';
// import { getCategory, getCategories } from '../categories/data';
// import CategoryTypes, { getNameByValue } from '../enums/category-types';
// import { sortBy, memoize } from '../utils/fns';

// const createFilter = ({ period, category }) => {
//   const filter = {};
//   if (period) filter.period = { $eq: period };
//   if (category) filter.category = { $eq: category };
//   return filter;
// };

// export const importTransactions = async (accountId, rows) => {
//   // const collection = await getCollection(accountId);
//   collection.insert(rows);
// };

// export const updateTransactions = async (accountId, rows) => {
//   // const collection = await getCollection(accountId);
//   collection.update(rows);
// };

// export const getTransactions = async (accountId, filters) => {
//   // const collection = await getCollection(accountId);
//   // return collection.find(createFilter(filters));
// };

// export const getTransactionsByCategory = memoize(async (accountId, period) => {
//   // const transactions = await getTransactions(accountId, { period });
//   // const categories = await getCategories();

//   const totalSpending = transactions
//     .map(t => {
//       const category = categories.find(c => c.id === t.category);
//       return {
//         category: t.category,
//         categoryType: category.type,
//         categoryName: category.name,
//         color: category.color,
//         amount: t.amount
//       };
//     })
//     .filter(t => t.categoryType === CategoryTypes.Spending)
//     .reduce((totalPerCategory, t) => {
//       if (!totalPerCategory[t.category]) totalPerCategory[t.category] = { ...t };
//       else totalPerCategory[t.category].amount += t.amount;
//       return totalPerCategory;
//     }, {});

//   return Object.values(totalSpending)
//     .map(item => ({
//       value: Math.abs(Math.round(item.amount)),
//       color: item.color,
//       name: item.categoryName
//     }))
//     .sort(sortBy('name'));
// });

// const categoryTypeColors = {
//   [CategoryTypes.Income]: 'limegreen',
//   [CategoryTypes.Spending]: 'tomato'
// };
// export const getTransactionsByCategoryType = memoize(async (accountId, period) => {
//   const transactions = await getTransactions(accountId, { period });
//   const categories = await getCategories();

//   const totalSpending = transactions
//     .map(t => {
//       const category = categories.find(c => c.id === t.category);
//       return {
//         categoryType: category.type,
//         color: categoryTypeColors[category.type],
//         amount: t.amount
//       };
//     })
//     .filter(t => t.categoryType !== CategoryTypes.Ignored)
//     .reduce((totalPerCategoryType, t) => {
//       if (!totalPerCategoryType[t.categoryType]) totalPerCategoryType[t.categoryType] = { ...t };
//       else totalPerCategoryType[t.categoryType].amount += t.amount;
//       return totalPerCategoryType;
//     }, {});

//   return Object.values(totalSpending)
//     .map(item => ({
//       value: Math.abs(Math.round(item.amount)),
//       name: getNameByValue(item.categoryType),
//       color: item.color
//     }))
//     .sort(sortBy('name'));
// });

// export const getPeriods = async accountId => {
//   const collection = await getCollection(accountId);
//   return collection
//     .mapReduce(row => row.period, rows => [...new Set(rows)])
//     .sort((p1, p2) => p2 - p1);
// };

// export const getFirstPeriod = async accountId => {
//   const periods = await getPeriods(accountId);
//   return periods[periods.length - 1];
// };

// export const getLastPeriod = async accountId => {
//   const periods = await getPeriods(accountId);
//   return periods[0];
// };
