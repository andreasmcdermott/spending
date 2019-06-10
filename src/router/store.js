import { writable } from 'svelte/store';

const currentPage = newPage => {
  if (!newPage) return localStorage.getItem('currentPage');
  localStorage.setItem('currentPage', newPage);
};

const store = writable(currentPage() || '/');

store.subscribe(currentPage);

export default store;
