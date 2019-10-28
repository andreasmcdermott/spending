export const mapEventToChange = onChange => e => onChange(e.target.name, e.target.value);

export const sortBy = prop => (obj1, obj2) => obj1[prop].localeCompare(obj2[prop]);

let memoCache = {};
export const memoize = fn => async (...args) => {
  const cache = memoCache[fn];
  if (cache && cache.args.length === args.length && args.every((arg, i) => cache.args[i] === arg))
    return cache.value;

  const value = await fn(...args);
  memoCache[fn] = { args, value };
  return value;
};
