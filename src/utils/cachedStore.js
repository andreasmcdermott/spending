import { writable } from 'svelte/store';

export const createCachedStore = (name, initialValue) => {
  const current = localStorage.getItem(name);
  const store = writable(current === null ? initialValue : JSON.parse(current));

  store.subscribe(val => {
    localStorage.setItem(name, JSON.stringify(val));
  });

  return store;
};

export const clearCachedStore = name => {
  localStorage.removeItem(name);
};
