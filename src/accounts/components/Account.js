import React from 'react';
import { Link } from '@reach/router';
import { withData } from '../../utils/data';
import { getAccount, removeAccount } from '../data';
import { getTransactionsByCategory, getPeriods } from '../../transactions/data';
import ColumnTypes from '../../enums/column-types';
import { getNameByType } from '../../enums/account-types';
import Chart from '../../reports/components/Chart';

const Account = ({ navigate, account, spendingByCategory, firstPeriod, lastPeriod }) =>
  <div>
    <h2>
      {account.name}
    </h2>
    <button
      onClick={() => {
        removeAccount(account.id);
        navigate('..');
      }}
    >
      Remove
    </button>
    <p>
      {getNameByType(account.type)}
    </p>
    <p>
      Periods: {firstPeriod + 1} - {lastPeriod + 1}
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
          {!!Object.keys(spendingByCategory).length &&
            <Chart data={spendingByCategory} title="Total Spending" />}
        </div>
        <Link to={`/transactions/${account.id}/import`}>Import</Link>
        &nbsp;
        <Link to={`/transactions/${account.id}/update`}>Update Imports</Link>
        &nbsp;
      </React.Fragment>}
    <Link to={`/accounts/${account.id}/define-import-format`}>Define import format</Link>
  </div>;

export default withData(({ accountId }) => {
  const periods = getPeriods(accountId);
  return {
    account: getAccount(accountId),
    spendingByCategory: getTransactionsByCategory(accountId),
    firstPeriod: periods[periods.length - 1],
    lastPeriod: periods[0]
  };
})(Account);
