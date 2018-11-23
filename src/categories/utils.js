import { getCategories } from './data';

const hasFilter = filter => !!filter.description || !!filter.amount;

const compareDescription = (filter, description) => {
  if (!filter.description) return true;
  return new RegExp(filter.description, 'ig').test(description);
};

const compareAmount = (filter, amount) => {
  if (!filter.amount) return true;
  if (filter.amount.type === 'equals') return filter.amount.value === amount;
  if (filter.amount.type === '<') return filter.amount.value >= amount;
  if (filter.amount.type === '>') return filter.amount.value <= amount;
  return false;
};

export const mapCategory = () => {
  const categories = getCategories();
  return ({ description, amount }) => {
    const category = categories.find(c =>
      c.filters.some(filter => {
        if (!hasFilter(filter)) return false;
        return compareDescription(filter, description) && compareAmount(filter, amount);
      })
    );
    return category ? category.id : null;
  };
};
