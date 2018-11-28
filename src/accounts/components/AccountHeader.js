import React from 'react';
import Link from '../../components/Link';
import Title from '../../components/Title';
import ConfirmButton from '../../components/ConfirmButton';
import { getNameByType } from '../../enums/account-types';

const ListItem = ({ children }) =>
  <li className={`mr-4 text-center`}>
    {children}
  </li>;

const AccountHeader = ({ account, firstPeriod, lastPeriod, onRemove }) =>
  <React.Fragment>
    <Title>
      <React.Fragment>
        <span className="flex items-end">
          <span>
            {account.name}
          </span>
          <span className="ml-2 mr-2 pr-2 border-r text-xs font-normal">
            {getNameByType(account.type)}
          </span>
          <span className="text-xs font-normal">
            Imported periods: {firstPeriod + 1} - {lastPeriod + 1}
          </span>
          <span className="ml-auto flex-none text-xs">
            <ConfirmButton onClick={onRemove}>X</ConfirmButton>
          </span>
        </span>
      </React.Fragment>
    </Title>

    <div className="flex items-center mb-6 border-y">
      <ul className="list-reset flex items-center text-xs">
        <ListItem>
          <Link to={`/accounts/${account.id}`}>Dashboard</Link>
        </ListItem>
        {!!account.importFormat &&
          <ListItem>
            <Link to={`/transactions/${account.id}/import`}>Import Transactions</Link>
          </ListItem>}
        {!!account.importFormat &&
          <ListItem>
            <Link to={`/transactions/${account.id}/update`}>Update Transactions</Link>
          </ListItem>}
        <ListItem>
          <Link to={`/accounts/${account.id}/define-import-format`}>Import Format</Link>
        </ListItem>
      </ul>
    </div>
  </React.Fragment>;

export default AccountHeader;
