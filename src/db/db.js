import loki from 'lokijs';
import LokiFsStructuredAdapter from 'lokijs/src/loki-fs-structured-adapter';
import paths from '../utils/paths';

let db = null;
let promise = null;

const collections = [['accounts', {}], ['categories', {}]];

export function loadDb() {
  if (promise) return promise;

  promise = new Promise(resolve => {
    const path = paths.userData('main.db');
    const adapter = new LokiFsStructuredAdapter();
    db = new loki(path, {
      adapter,
      autoload: true,
      autosave: true,
      autosaveInterval: 1500,
      autoloadCallback: () => {
        collections.forEach(([name, options]) => {
          if (!db.getCollection(name)) {
            db.addCollection(name, options);
          }
        });
        resolve();
      },
    });
  });

  return promise;
}

export const getCollection = name => {
  if (collections.every(([n]) => name !== n))
    throw new Error(`Collection ${name} doesn't exist...`);
  return db.getCollection(name);
};
