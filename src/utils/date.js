export const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const padNum = (str) => (str.length < 2 ? `0${str}` : str);

export const toString = (date, format = 'MMM d, yyyy') =>
  format
    .replace('yyyy', date.getFullYear())
    .replace('MMM', shortMonths[date.getMonth()])
    .replace('dd', padNum(date.getDate()))
    .replace('d', date.getDate());
