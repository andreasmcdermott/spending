import getCollection from './collection';
import { createIdFromName, sortBy } from '../utils/fns';
import { getRandomColor } from '../enums/colors';
import CategoryTypes from '../enums/category-types';

export const getCategories = () => getCollection().find({}).sort(sortBy('name'));

export const getCategory = id => getCollection().findOne({ id });

export const addCategory = name => {
  const id = createIdFromName(name);
  const categories = getCollection();
  categories.insert({
    id,
    name,
    filters: [],
    // Defaults:
    type: CategoryTypes.Spending,
    color: getRandomColor()
  });
};

export const updateCategory = category => {
  const categories = getCollection();
  categories.update(category);
};

export const removeCategory = id => {
  const categories = getCollection();
  categories.findAndRemove({ id });
};

export const addFilter = (id, filter) => {
  const categories = getCollection();
  const category = categories.findOne({ id });
  category.filters.push(filter);
  categories.update(category);
};

export const removeFilter = (id, index) => {
  const categories = getCollection();
  const category = categories.findOne({ id });
  category.filters.splice(index, 1);
  categories.update(category);
};
