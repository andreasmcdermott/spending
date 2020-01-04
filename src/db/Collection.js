import { writable } from 'svelte/store';
import { getCollection } from '../db/db';
import { sortBy } from '../utils/fns';
import uuid from '../utils/uuid';

export default class Collection {
  constructor(name, useStore = true) {
    this.useStore = useStore;
    this.name = name;
    this.collection = null;
    this.store = useStore
      ? writable(null, set => {
          set(this.getAllSorted());
          return () => {};
        })
      : writable(Date.now());
  }

  _updateStore() {
    if (this.useStore) {
      this.store.set(this.getAllSorted());
    } else {
      this.store.set(Date.now());
    }
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

  getFiltered(filter, sort) {
    const filtered = this.instance.find(filter);
    if (sort) {
      filtered.sort(sort);
    }
    return filtered;
  }

  getOne(id) {
    return this.instance.findOne({ id });
  }

  insert(item) {
    try {
      const id = uuid();
      this.instance.insert({ id, ...item });
      this._updateStore();
      return id;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  insertMany(items) {
    try {
      this.instance.insert(items);
      this._updateStore();
      return items.map(i => i.id);
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  update(item) {
    try {
      this.instance.update(item);
      this._updateStore();
    } catch (err) {
      console.error(err);
    }
  }

  updateMany(items) {
    try {
      items.forEach(item => this.instance.update(item));
      this._updateStore();
    } catch (err) {
      console.error(err);
    }
  }

  remove(id) {
    try {
      const doc = this.getOne(id);
      this.instance.remove(doc);
      this._updateStore();
    } catch (err) {
      console.error(err);
    }
  }

  createDynamicView(name) {
    const dynamicView = this.instance.getDynamicView(name);
    if (dynamicView) return dynamicView;
    return this.instance.addDynamicView(name);
  }

  removeDynamicView(name) {
    this.instance.removeDynamicView(name);
  }
}
