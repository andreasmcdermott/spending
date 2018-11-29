import { addCollection, getCollection } from '../utils/db';

const CATEGORIES = 'categories';

export const addCategoriesCollection = async () => {
  await addCollection(CATEGORIES, { unique: ['id', 'name'], indices: ['id'] });
};

export default async () => getCollection(CATEGORIES);
