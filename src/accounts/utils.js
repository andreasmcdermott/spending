import ColumnTypes from './columnTypes';
import { mapCategory } from '../categories/utils';

export const mapToImportFormat = (importFormat, manualCategories) => {
  const id = importFormat.columns.find(c => c.type === ColumnTypes.Id).name;
  const date = importFormat.columns.find(c => c.type === ColumnTypes.Date).name;
  const desc = importFormat.columns.find(c => c.type === ColumnTypes.Description).name;
  const amount = importFormat.columns.find(c => c.type === ColumnTypes.Amount).name;
  const getCategory = mapCategory();
  return row => {
    const idValue = row[id].replace(/[^a-z0-9]+/gi, '-');
    return {
      id: idValue,
      date: new Date(row[date]),
      description: row[desc],
      amount: row[amount],
      category:
        manualCategories[idValue] || getCategory({ description: row[desc], amount: row[amount] })
    };
  };
};
