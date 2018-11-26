import React from 'react';
import AccountTypes from '../../enums/account-types';
import Form from '../../components/Form';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { addAccount } from '../data';
import { mapEventToChange } from '../../utils/fns';

const NewAccount = ({ navigate }) =>
  <React.Fragment>
    <Title>New Account</Title>

    <Form
      formData={{ name: '', type: null }}
      onSave={data => {
        const account = addAccount(data);
        navigate(`../${account.id}`);
      }}
    >
      {({ name, type }, onChange) =>
        <React.Fragment>
          <div className="mb-4">
            <label htmlFor="new-account-name">Account Name</label>
            <input
              id="new-account-name"
              className="p-2 font-normal border border-gray-lighter w-full"
              type="text"
              name="name"
              value={name}
              onChange={mapEventToChange(onChange)}
            />
          </div>

          <div className="mb-4 flex items-baseline">
            {Object.entries(AccountTypes).map(([label, value]) =>
              <React.Fragment key={value}>
                <input
                  id={`new-account-type-${value}`}
                  className="mr-1"
                  type="radio"
                  name="type"
                  value={value}
                  checked={value === type}
                  onChange={mapEventToChange(onChange)}
                />
                <label htmlFor={`new-account-type-${value}`} className="mr-4">
                  {label}
                </label>
              </React.Fragment>
            )}
          </div>
          <Button isSubmit variant="primary">
            Create
          </Button>
        </React.Fragment>}
    </Form>
  </React.Fragment>;

export default NewAccount;
