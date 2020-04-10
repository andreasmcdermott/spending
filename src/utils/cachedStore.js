import { writable } from 'svelte/store';

export const createCachedStore = (name, initialValue) => {
  const current = localStorage.getItem(name);
  const store = writable(current === null ? initialValue : JSON.parse(current));

  store.subscribe((val) => {
    localStorage.setItem(name, JSON.stringify(val));
  });

  store.clear = () => localStorage.removeItem(name);

  return store;
};

export const hasCachedData = (name) => {
  const current = localStorage.getItem(name);
  if (current === null) return false;
  const data = JSON.parse(current);
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === 'object') return Object.keys(data).length > 0;
  return !!data;
};

export const clearCachedData = (name) => {
  localStorage.removeItem(name);
};
