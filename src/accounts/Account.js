import React from 'react';
import { Link } from '@reach/router';
import { withData } from '../utils/data';
import { getAccountById, getTotalSpendingByCategory } from './data';
import ColumnTypes from './columnTypes';
import { getNameByType } from './accountTypes';
import Chart from '../components/Chart';

const Account = ({ account, totalSpendingByCategory }) =>
  <div>
    <h2>
      {account.name}
    </h2>
    <p>
      {getNameByType(account.type)}
    </p>
    <p>Current format:</p>
    {!!account.importFormat &&
      <React.Fragment>
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
                    {column.type}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <div>
          <Chart data={totalSpendingByCategory} title="Total Spending" />
        </div>
        <Link to={`/accounts/${account.id}/import`}>Import</Link>
      </React.Fragment>}
    <Link to={`/accounts/${account.id}/define-import-format`}>Define import format</Link>
  </div>;

export default withData(({ accountId }) => ({
  account: getAccountById(accountId),
  totalSpendingByCategory: getTotalSpendingByCategory(accountId)
}))(Account);
