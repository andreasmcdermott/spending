import { get } from 'svelte/store';

export const sortBy = (prop) => (obj1, obj2) => {
  let p1 = obj1[prop];
  let p2 = obj2[prop];

  if (p1 instanceof Date) p1 = p1.getTime();
  if (p2 instanceof Date) p2 = p2.getTime();

  if (typeof p1 === 'number' && typeof p2 === 'number') {
    return p1 - p2;
  }

  if (typeof p1 !== 'string') p1 = String(p1);
  if (typeof p2 !== 'string') p2 = String(p2);

  return p1.localeCompare(p2);
};

const isUpperCase = (letter) => /[A-Z]/.test(letter);

export const labelifyCamelCase = (str) =>
  str
    .split('')
    .reduce((acc, l) => acc + (isUpperCase(l) ? ' ' : '') + l, '')
    .trim();

export const createSlugFromName = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/, '')
    .replace(/\s+/, '-');

export const createCachedMap = (store) => {
  let map = null;
  return () => {
    if (!map) {
      map = get(store).reduce((acc, x) => {
        acc[x.id] = x;
        return acc;
      }, {});
    }
    return map;
  };
};
