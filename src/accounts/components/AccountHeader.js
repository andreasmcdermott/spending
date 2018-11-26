import React from 'react';
import { Link } from '@reach/router';
import Title from '../../components/Title';
import ConfirmButton from '../../components/ConfirmButton';
import { getNameByType } from '../../enums/account-types';

const AccountHeader = ({ account, firstPeriod, lastPeriod, onRemove }) =>
  <React.Fragment>
    <Title>
      <React.Fragment>
        <span className="flex items-end">
          {account.name}
          <span className="ml-2 mr-2 pr-2 border-r text-xs font-normal">
            {getNameByType(account.type)}
          </span>
          <span className="text-xs font-normal">
            Imported periods: {firstPeriod + 1} - {lastPeriod + 1}
          </span>
        </span>
      </React.Fragment>
    </Title>

    <div className="flex items-center mb-4 p-2 bg-grey-lighter">
      <ul className="list-reset flex">
        <li className="mr-4 pr-4 border-r">
          <Link to={`/accounts/${account.id}`}>Dashboard</Link>
        </li>
        {!!account.importFormat &&
          <li className="mr-4 pr-4 border-r">
            <Link to={`/transactions/${account.id}/import`}>Import Transactions</Link>
          </li>}
        {!!account.importFormat &&
          <li className="mr-4 pr-4 border-r">
            <Link to={`/transactions/${account.id}/update`}>Update Transactions</Link>
          </li>}
        <li>
          <Link to={`/accounts/${account.id}/define-import-format`}>Import Format</Link>
        </li>
      </ul>
      <span className="ml-auto">
        <ConfirmButton onClick={onRemove}>Remove</ConfirmButton>
      </span>
    </div>
  </React.Fragment>;

export default AccountHeader;
