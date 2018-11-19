const AccountTypes = {
  Checking: 'c',
  'Credit Card': 'cc'
};

export default AccountTypes;

export const getNameByType = type => {
  const found = Object.entries(AccountTypes).find(([n, t]) => t === type);
  return !!found ? found[0] : null;
};
