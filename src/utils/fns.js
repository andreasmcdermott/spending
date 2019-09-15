export const sortBy = prop => (obj1, obj2) => obj1[prop].localeCompare(obj2[prop]);

const isUpperCase = letter => /[A-Z]/.test(letter);

export const labelifyCamelCase = str =>
  str
    .split('')
    .reduce((acc, l) => acc + (isUpperCase(l) ? ' ' : '') + l)
    .trim();

export const createIdFromName = name =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/, '')
    .replace(/\s+/, '-');
