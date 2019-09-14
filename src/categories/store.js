import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';
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
  subscribe: collection.store.subscribe,
};

export const createCategory = category => {
  const id = category.name
    .toLowerCase()
    .replace(/[^a-z]+/, '')
    .replace(/\s+/, '-');
  collection.insert({ ...category, filters: [], color: getRandomColor(), id });
};

export const updateCategory = category => {
  collection.update(category);
};

export const removeCategory = id => {
  collection.remove(id);
};
