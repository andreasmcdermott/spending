const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatAmount = (amount) => formatter.format(amount);
