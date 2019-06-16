import Collection from '../db/Collection';
import { sortBy } from '../utils/fns';

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
  collection.insert(category);
};
