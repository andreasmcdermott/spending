import React from 'react';
import { navigate } from '@reach/router';
import AccountTypes from './accountTypes';
import Form from '../components/Form';
import { addAccount } from './data';
import { mapEventToChange } from '../utils/fns';

const NewAccount = () =>
  <Form
    formData={{ name: '', type: null }}
    onSave={data => {
      const account = addAccount(data);
      navigate(`/accounts/${account.id}`);
    }}
  >
    {({ name, type }, onChange) =>
      <React.Fragment>
        <div>
          <label>Account name</label>
          <input type="text" name="name" value={name} onChange={mapEventToChange(onChange)} />
        </div>

        <div>
          {Object.entries(AccountTypes).map(([label, value]) =>
            <label key={value}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={value === type}
                onChange={mapEventToChange(onChange)}
              />
              {label}
            </label>
          )}
        </div>
        <button type="submit">Create</button>
      </React.Fragment>}
  </Form>;

export default NewAccount;
