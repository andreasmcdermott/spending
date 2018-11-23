import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from './paths';

const DB_NAME = 'main.db';

const readyListeners = [];
let db;
const getDb = () => {
  if (db) return db;
  const path = paths.userData(DB_NAME);
  const adapter = new LokiFsStructuredAdapter();
  db = new loki(path, {
    adapter,
    autoload: true,
    autosave: true,
    autosaveInterval: 1500,
    autoloadCallback: () => {
      addCollections();
      readyListeners.forEach(fn => fn());
    }
  });
  return db;
};

export const loadDb = () => {
  getDb();
};

export const getDbReady = fn => {
  readyListeners.push(fn);
};

export const addCollection = (name, options) => {
  return getDb().getCollection(name) || getDb().addCollection(name, options);
};

export const removeCollection = name => getDb().removeCollection(name);

export const getCollection = name => getDb().getCollection(name);

const addCollections = () => {
  addCollection('accounts', { unique: ['id', 'name'], indices: ['id'] });
  addCollection('categories', { unique: ['id', 'name'], indices: ['id'] });
};

loadDb();
