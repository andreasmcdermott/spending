import React from 'react';
import AccountTypes from './accountTypes';

const AccountForm = () =>
  <div>
    <h1>Account</h1>
    <form>
      <div>
        <label>Account name</label>
        <input type="text" name="name" />
      </div>

      <div>
        {Object.entries(AccountTypes).map(([label, value]) =>
          <label key={value}>
            {label}
            <input type="radio" name="type" value={value} />
          </label>
        )}
      </div>

      <div>
        <label>Import format</label>
        <input type="file" name="file" />
        <ul>
          <li>Columns output</li>
        </ul>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>;

export default AccountForm;
