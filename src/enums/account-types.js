import { labelifyCamelCase } from '../utils/fns';

const AccountTypes = {
  Checking: 'c',
  Saving: 's',
  CreditCard: 'cc'
};

export default AccountTypes;

export const getNameByType = type => {
  const found = Object.entries(AccountTypes).find(([n, t]) => t === type);
  return labelifyCamelCase(!!found ? found[0] : '');
};
