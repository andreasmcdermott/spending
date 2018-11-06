import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from './paths';

const DB_NAME = 'main.db';

let db;
const getDb = () => {
  if (db) return db;
  const path = paths.userData(DB_NAME);
  const adapter = new LokiFsStructuredAdapter();
  db = new loki(path, {
    adapter,
    autoload: true,
    autosave: true,
    autosaveInterval: 5000
  });
  return db;
};

export const getCollection = name => getDb().addCollection(name);
