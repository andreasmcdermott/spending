import fs from 'fs';
import paths from '../utils/paths';
import Collection from './collection';

const loadFromFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    });
  }).then(json => JSON.parse(json));

const saveToFile = (path, data) =>
  new Promise((resolve, reject) => {
    try {
      fs.writeFile(path, JSON.stringify(data), 'utf8', err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  });

const fileExists = path =>
  new Promise(resolve => {
    fs.access(path, err => {
      resolve(!err);
    });
  });

const parseRawDataStructure = data =>
  Object.keys(data).reduce((acc, key) => {
    const { values } = data[key];
    acc[key] = new Collection(key, values);
    return acc;
  }, {});

const toRawDataStructure = data =>
  Object.keys(data).reduce(async (acc, key) => {
    const collection = data[key];
    acc[key] = await collection.toRawData();
  }, {});

let instance = null;
class Db {
  static getInstance() {
    if (!instance) {
      intance = new Db();
    }

    return instance;
  }

  constructor() {
    this.collections = {};
    this.loadedFromFileTimestamp = null;
    this.savedToFileTimestamp = null;
  }

  async getCollection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(name, []);
    }
    return this.collections[name];
  }

  async loadFromFile(filename) {
    const path = paths.userData(filename);
    const exist = await fileExists(path);
    if (!exist) {
      this.collections = {};
    } else {
      const rawData = await loadFromFile(path);
      this.collections = parseRawDataStructure(rawData);
      this.loadedFromFileTimestamp = Date.now();
    }
  }

  async saveToFile(filename) {
    const path = paths.userData(filename);
    this.savedToFileTimestamp = Date.now();
    await saveToFile(path, toRawDataStructure(this.collections));
  }
}

export default () => Db.getInstance();
