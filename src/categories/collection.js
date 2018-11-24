import { addCollection, getCollection } from '../utils/db';

const CATEGORIES = 'categories';

export const addCategoriesCollection = () => {
  addCollection(CATEGORIES, { unique: ['id', 'name'], indices: ['id'] });
};

export default () => getCollection(CATEGORIES);
