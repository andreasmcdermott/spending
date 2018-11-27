export const mapEventToChange = onChange => e => onChange(e.target.name, e.target.value);

export const createIdFromName = name =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]+/, '');

export const sortBy = prop => (obj1, obj2) => obj1[prop].localeCompare(obj2[prop]);

let memoCache = {};
export const memoize = fn => (...args) => {
  const cache = memoCache[fn];
  if (cache && cache.args.length === args.length && args.every((arg, i) => cache.args[i] === arg))
    return cache.value;

  const value = fn(...args);
  memoCache[fn] = { args, value };
  return value;
};

const isUpperCase = letter => /[A-Z]/.test(letter);

export const labelifyCamelCase = str =>
  str.split('').reduce((acc, l) => acc + (isUpperCase(l) ? ' ' : '') + l).trim();
