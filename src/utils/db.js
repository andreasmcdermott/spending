import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from './paths';

const DB_NAME = 'main.db';
const internalReadyListeners = [];
const externalReadyListeners = [];
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
      internalReadyListeners.forEach(fn => fn());
      externalReadyListeners.forEach(fn => fn());
    }
  });
  return () => db;
}

export const onDbReady = fn => {
  externalReadyListeners.push(fn);
};

const whenReady = fn => {
  if (ready) {
    fn();
  } else {
    internalReadyListeners.push(fn);
  }
};

export const addCollection = async (name, options) =>
  new Promise(resolve => {
    if (getDb().getCollection(name)) resolve();

    whenReady(() => {
      getDb().addCollection(name, options);
      resolve();
    });
  });

export const removeCollection = async name =>
  new Promise(resolve => {
    whenReady(() => {
      getDb().removeCollection(name);
      resolve();
    });
  });

export const getCollection = async name =>
  new Promise(resolve => {
    whenReady(() => {
      resolve(getDb().getCollection(name));
    });
  });

loadDb();
