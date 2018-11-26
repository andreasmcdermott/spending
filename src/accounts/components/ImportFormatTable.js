import React from 'react';
import { getNameByType } from '../../enums/column-types';

const ImportFormatTable = ({ account }) =>
  <table>
    <thead>
      <tr>
        <th>Column Name</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {account.importFormat.columns
        .filter(
          column =>
            column.type !== ColumnTypes.Ignored && column.type !== ColumnTypes['Not Defined']
        )
        .map(column =>
          <tr key={column.name}>
            <td>
              {column.name}
            </td>
            <td>
              {getNameByType(column.type)}
            </td>
          </tr>
        )}
    </tbody>
  </table>;

export default ImportFormatTable;
