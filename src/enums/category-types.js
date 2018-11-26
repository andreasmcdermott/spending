const CategoryTypes = {
  Spending: '-',
  Income: '+',
  Ignored: '0'
};

export default CategoryTypes;

export const getNameByValue = value =>
  Object.entries(CategoryTypes).find(([k, v]) => v === value)[0];
