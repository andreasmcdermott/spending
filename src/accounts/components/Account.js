import React from 'react';
import { withData } from '../../utils/data';
import { getAccount, removeAccount } from '../data';
import {
  getTransactionsByCategory,
  getTransactionsByCategoryType,
  getFirstPeriod,
  getLastPeriod
} from '../../transactions/data';
import Chart from '../../reports/components/Chart';
import AccountHeader from './AccountHeader';

const Account = ({
  navigate,
  account,
  spendingByCategory,
  spendingVsIncome,
  firstPeriod,
  lastPeriod
}) =>
  <div>
    <AccountHeader
      account={account}
      firstPeriod={firstPeriod}
      lastPeriod={lastPeriod}
      onRemove={() => {
        removeAccount(account.id);
        navigate('..');
      }}
    />

    {!!account.importFormat &&
      <div className="flex flex-col">
        {!!spendingByCategory.length &&
          <Chart data={spendingByCategory} title="Spending By Category" />}
        {!!spendingVsIncome.length && <Chart data={spendingVsIncome} title="Spending vs Income" />}
      </div>}
  </div>;

export default withData(
  ({ accountId }) => ({
    account: getAccount(accountId),
    spendingByCategory: getTransactionsByCategory(accountId),
    spendingVsIncome: getTransactionsByCategoryType(accountId),
    firstPeriod: getFirstPeriod(accountId),
    lastPeriod: getLastPeriod(accountId)
  }),
  ['accountId']
)(Account);
