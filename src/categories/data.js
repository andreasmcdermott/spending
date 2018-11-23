import { getCollection } from '../utils/db';
import { createIdFromName } from '../utils/utils';

export const getCategories = () =>
  getCollection('categories').find({}).sort((c1, c2) => c1.name.localeCompare(c2.name));

export const getCategoryById = categoryId =>
  getCollection('categories').findOne({ id: categoryId });

export const addCategory = name => {
  const id = createIdFromName(name);
  const categories = getCollection('categories');
  categories.insert({ id, name, filters: [] });
};

export const addFilterToCategory = (categoryId, filter) => {
  const categories = getCollection('categories');
  const category = categories.findOne({ id: categoryId });
  category.filters.push(filter);
  categories.update(category);
};

export const removeFilter = (categoryId, index) => {
  const categories = getCollection('categories');
  const category = categories.findOne({ id: categoryId });
  category.filters.splice(index, 1);
  categories.update(category);
};

export const updateCategory = category => {
  const categories = getCollection('categories');
  categories.update(category);
};
