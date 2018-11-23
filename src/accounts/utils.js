import ColumnTypes from './columnTypes';
import { mapCategory } from '../categories/utils';

export const mapToImportFormat = importFormat => {
  const id = importFormat.columns.find(c => c.type === ColumnTypes.Id).name;
  const date = importFormat.columns.find(c => c.type === ColumnTypes.Date).name;
  const desc = importFormat.columns.find(c => c.type === ColumnTypes.Description).name;
  const amount = importFormat.columns.find(c => c.type === ColumnTypes.Amount).name;
  const getCategory = mapCategory();
  return row => {
    const dateValue = new Date(row[date]);
    const descValue = row[desc];
    const periodValue = dateValue.getFullYear() * 100 + dateValue.getMonth();
    const amountValue = row[amount];
    let idValue;
    if (id === '$uuid$') {
      idValue = row.uuid;
    } else {
      idValue = row[id].replace(/[^a-z0-9]+/gi, '-');
    }

    return {
      id: idValue,
      date: dateValue,
      period: periodValue,
      description: descValue,
      amount: amountValue,
      category: getCategory({ description: descValue, amount: row[amount] })
    };
  };
};
