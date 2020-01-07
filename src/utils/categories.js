import { get } from 'svelte/store';
import { categories } from '../categories/store';

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

const hasFilter = filter => !!filter.description || !!filter.amount;

const compareDescription = (filter, description) => {
  if (!filter.description) return true;
  return new RegExp(filter.description, 'ig').test(description);
};

const compareAmount = (filter, amount) => {
  if (!filter.amount) return true;
  if (filter.amount.type === '=') return filter.amount.value === amount;
  if (filter.amount.type === '<') return filter.amount.value >= amount;
  if (filter.amount.type === '>') return filter.amount.value <= amount;
  return false;
};

export const mapCategory = () => {
  const categoryValues = Object.values(getCategoriesMap());
  return ({ description, amount }) => {
    const category = categoryValues.find(c =>
      c.filters.some(filter => {
        if (!hasFilter(filter)) return false;
        return compareDescription(filter, description) && compareAmount(filter, amount);
      })
    );
    return category ? category.id : null;
  };
};

export const getCategoryName = id => getCategoriesMap()[id].name;
export const getCategoryColor = id => getCategoriesMap()[id].color;
export const getCategoryType = id => getCategoriesMap()[id].type;
