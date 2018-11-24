import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from './paths';

const DB_NAME = 'main.db';
const readyListeners = [];
const getDb = loadDb();

function loadDb() {
  const path = paths.userData(DB_NAME);
  const adapter = new LokiFsStructuredAdapter();
  const db = new loki(path, {
    adapter,
    autoload: true,
    autosave: true,
    autosaveInterval: 1500,
    autoloadCallback: () => {
      readyListeners.forEach(fn => fn());
    }
  });
  return () => db;
}

export const onDbReady = fn => {
  readyListeners.push(fn);
};

export const addCollection = (name, options) => {
  return getDb().getCollection(name) || getDb().addCollection(name, options);
};

export const removeCollection = name => getDb().removeCollection(name);

export const getCollection = name => getDb().getCollection(name);

loadDb();
