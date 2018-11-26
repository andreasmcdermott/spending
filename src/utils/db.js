import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from './paths';

const DB_NAME = 'main.db';
const readyListeners = [];
let ready = false;
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
      ready = true;
      addedCollections.forEach(args => {
        addCollection(...args);
      });
      readyListeners.forEach(fn => fn());
    }
  });
  return () => db;
}

export const onDbReady = fn => {
  readyListeners.push(fn);
};

const addedCollections = [];
export const addCollection = (name, options) => {
  if (getDb().getCollection(name)) return;

  if (ready) getDb().addCollection(name, options);
  else addedCollections.push([name, options]);
};

export const removeCollection = name => getDb().removeCollection(name);

export const getCollection = name => getDb().getCollection(name);

loadDb();
