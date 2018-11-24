export const mapEventToChange = onChange => e => onChange(e.target.name, e.target.value);

export const createIdFromName = name =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]+/, '');

export const sortBy = prop => (obj1, obj2) => obj1[prop].localeCompare(obj2[prop]);
