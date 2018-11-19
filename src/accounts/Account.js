import React from 'react';
import { withData } from '../utils/data';
import { getAccountById } from './data';
import { getNameByType } from './accountTypes';
import { Link } from '@reach/router';
import ColumnTypes from './columnTypes';

const Account = ({ account }) =>
  <div>
    <h2>
      {account.name}
    </h2>
    <p>
      {getNameByType(account.type)}
    </p>
    <h2>Define import format</h2>
    <p>Current format:</p>
    {!!account.importFormat
      ? <table>
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
                <tr>
                  <td>
                    {column.name}
                  </td>
                  <td>
                    {column.type}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      : <Link to={`/accounts/${account.id}/define-import-format`}>Define import format</Link>}
  </div>;

export default withData(({ accountId }) => ({ account: getAccountById(accountId) }))(Account);
