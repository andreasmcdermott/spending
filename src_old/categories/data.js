import getCollection from './collection';
import { createIdFromName, sortBy } from '../utils/fns';
import { getRandomColor } from '../enums/colors';
import CategoryTypes from '../enums/category-types';

export const getCategories = async () => {
  const collection = await getCollection();
  return collection.find({}).sort(sortBy('name'));
};

export const getCategory = async id => {
  const collection = await getCollection();
  return collection.findOne({ id });
};

export const addCategory = async name => {
  const id = createIdFromName(name);
  const categories = await getCollection();
  categories.insert({
    id,
    name,
    filters: [],
    // Defaults:
    type: CategoryTypes.Spending,
    color: getRandomColor()
  });
};

export const updateCategory = async category => {
  const categories = await getCollection();
  categories.update(category);
};

export const removeCategory = id => {
  const categories = getCollection();
  categories.findAndRemove({ id });
};

export const addFilter = async (id, filter) => {
  const categories = await getCollection();
  const category = categories.findOne({ id });
  category.filters.push(filter);
  categories.update(category);
};

export const removeFilter = async (id, index) => {
  const categories = await getCollection();
  const category = categories.findOne({ id });
  category.filters.splice(index, 1);
  categories.update(category);
};
