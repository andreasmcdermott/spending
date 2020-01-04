import ColumnTypes from '../enums/column-types';
import { mapCategory } from '../utils/categories';

const cleanDescription = desc => desc.replace(/\s{2,}/g, ' ');

export const mapToImportFormat = ({ columns }) => {
  const id = columns.find(c => c.type === ColumnTypes.Id).name;
  const date = columns.find(c => c.type === ColumnTypes.Date).name;
  const desc = columns.find(c => c.type === ColumnTypes.Description).name;
  const amount = columns.find(c => c.type === ColumnTypes.Amount).name;
  const getCategory = mapCategory();
  return row => {
    const dateValue = new Date(row[date]);
    const descValue = row[desc];
    const periodValue = dateValue.getFullYear() * 100 + (dateValue.getMonth() + 1);
    const amountValue = row[amount];
    let idValue;
    if (id === '$uuid$') {
      idValue = row.uuid;
    } else {
      idValue = row[id].replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-');
    }

    return {
      id: idValue,
      date: dateValue,
      period: periodValue,
      description: cleanDescription(descValue),
      amount: amountValue,
      category: getCategory({ description: descValue, amount: row[amount] })
    };
  };
};
