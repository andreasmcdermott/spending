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
    autosaveInterval: 5000,
    autoloadCallback: () => {
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
  if (!getDb().getCollection(name)) {
    getDb().addCollection(name, options);
  }
};

export const getCollection = name => getDb().getCollection(name);
