export const createIdFromName = name =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]+/, '');
