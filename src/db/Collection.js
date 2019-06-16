import { writable } from 'svelte/store';
import { getCollection } from '../db/db';
import { sortBy } from '../utils/fns';
import uuid from '../utils/uuid';

export default class Collection {
  constructor(name) {
    this.name = name;
    this.collection = null;
    this.store = writable(null, set => {
      set(this.getAllSorted());
      return () => {};
    });
  }

  get instance() {
    if (this.collection === null) {
      this.collection = getCollection(this.name);
    }
    return this.collection;
  }

  getAllSorted() {
    return this.getAll();
  }

  getAll(sort) {
    const all = this.instance.find({});
    if (sort) {
      all.sort(sort);
    }
    return all;
  }

  getOne(id) {
    return this.instance.findOne({ id });
  }

  insert(item) {
    try {
      this.instance.insert({ ...item, id: uuid() });
      this.store.set(this.getAllSorted());
    } catch (err) {
      console.error(err);
    }
  }
}
