import Collection from '../db/Collection';
import ColumnTypes, { UUID } from '../enums/column-types';
import { sortBy, createSlugFromName } from '../utils/fns';

class AccountsCollection extends Collection {
  constructor() {
    super('accounts');
  }

  getAllSorted() {
    return this.getAll(sortBy('name'));
  }
}

const collection = new AccountsCollection();

export const accounts = {
  subscribe: collection.store.subscribe
};

export const createAccount = account => {
  const slug = createSlugFromName(account.name);
  return collection.insert({ ...account, importFormat: { columns: [] }, slug });
};

export const getAccountById = id => collection.getOne(id);

export const removeAccount = id => collection.remove(id);

export const updateImportFormat = (id, importFormat) => {
  const account = collection.getOne(id);
  if (!account) throw new Error('Invalid account id.');
  if (!isValidImportFormat(importFormat)) throw new Error('Missing required columns types.');
  if (!hasIdColumn(importFormat)) importFormat.columns.push({ name: UUID, type: ColumnTypes.Id });
  collection.update({ ...account, importFormat });
};

const isValidImportFormat = importFormat => {
  if (!importFormat) return false;
  if (!importFormat.columns) return false;
  const requiredColumns = [ColumnTypes.Date, ColumnTypes.Amount, ColumnTypes.Description];
  return requiredColumns.every(req => importFormat.columns.some(c => c.type === req && !!c.name));
};

const hasIdColumn = importFormat => importFormat.columns.some(c => c.type === ColumnTypes.Id);
