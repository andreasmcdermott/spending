import getCollection from './collection';
import { addTransactionsCollection } from '../transactions/collection';
import ColumnTypes, { UUID } from '../enums/column-types';
import { createIdFromName, sortBy } from '../utils/fns';

export const getAccount = async id => {
  const collection = await getCollection();
  return collection.findOne({ id });
};

export const getAccounts = async () => {
  const collection = await getCollection();
  return collection.find({}).sort(sortBy('name'));
};

export const addAccount = async account => {
  if (!account.name || !account.type) throw new Error('Invalid account');

  account.id = createIdFromName(account.name);
  await addTransactionsCollection(account.id);
  const collection = await getCollection();
  collection.insert(account);
};

export const removeAccount = async id => {
  const collection = await getCollection();
  collection.findAndRemove({ id });
};

const validateImportFormat = importFormat => {
  if (!importFormat) return false;
  if (!importFormat.columns) return false;
  const requiredColumns = [ColumnTypes.Date, ColumnTypes.Amount, ColumnTypes.Description];
  return requiredColumns.every(req => importFormat.columns.some(c => c.type === req && !!c.name));
};

const hasIdColumn = importFormat => importFormat.columns.some(c => c.type === ColumnTypes.Id);

export const setImportFormat = async (id, importFormat) => {
  if (!validateImportFormat(importFormat)) throw new Error('Invalid import format!');

  const accounts = await getCollection();
  if (!hasIdColumn(importFormat)) {
    importFormat.columns.push({ name: UUID, type: ColumnTypes.Id }); // Use uuid for id
  }
  const account = accounts.findOne({ id });
  account.importFormat = importFormat;
  accounts.update(account);
};
