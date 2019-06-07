import getDb from './db';

export default class Collection {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }

  findById(id) {
    return Promise.resolve(this.values.find(item => item.id === id));
  }

  findAll() {
    return Promise.resolve([...this.values]);
  }

  removeById(id) {
    return new Promise(resolve => {});
  }

  toRawData() {
    return Promise.resolve({
      name: this.name,
      values: this.values
    });
  }
}
