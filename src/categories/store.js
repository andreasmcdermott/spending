import Collection from '../db/Collection';
import { sortBy, createSlugFromName } from '../utils/fns';
import { getRandomColor } from '../enums/colors';

class CategoriesCollection extends Collection {
  constructor() {
    super('categories');
  }

  getAllSorted() {
    return this.getAll(sortBy('name'));
  }
}

const collection = new CategoriesCollection();

export const categories = {
  subscribe: collection.store.subscribe
};

export const createCategory = category => {
  const slug = createSlugFromName(category.name);
  return collection.insert({ ...category, filters: [], color: getRandomColor(), slug });
};

export const updateCategory = category => {
  collection.update(category);
};

export const removeCategory = id => {
  collection.remove(id);
};
