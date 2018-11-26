import React from 'react';
import { Link } from '@reach/router';
import Title from '../../components/Title';
import ConfirmButton from '../../components/ConfirmButton';
import { getNameByType } from '../../enums/account-types';

const ListItem = ({ children, noBorder }) =>
  <li className={`mr-4 pr-4 text-center ${noBorder ? '' : 'border-r'}`}>
    {children}
  </li>;

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
      <ul className="list-reset flex items-center">
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
        <ListItem noBorder>
          <Link to={`/accounts/${account.id}/define-import-format`}>Import Format</Link>
        </ListItem>
      </ul>
      <span className="ml-auto flex-none">
        <ConfirmButton onClick={onRemove}>Remove</ConfirmButton>
      </span>
    </div>
  </React.Fragment>;

export default AccountHeader;
