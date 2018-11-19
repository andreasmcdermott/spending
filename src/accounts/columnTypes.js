const ColumnTypes = {
  Id: '!',
  Date: 'd',
  Amount: '$',
  Description: '?',
  Ignored: 'i',
  'Not Defined': '-'
};

export default ColumnTypes;

const guesses = {
  [ColumnTypes.Id]: /(\s|^)id(\s|$)/gi,
  [ColumnTypes.Date]: /(\s|^)date(\s|$)/gi,
  [ColumnTypes.Amount]: /amount/gi,
  [ColumnTypes.Description]: /description/gi
};

export const guessType = name =>
  Object.entries(guesses).reduce((found, [type, regex]) => {
    if (found) return found;
    return regex.test(name) ? type : null;
  }, null) || ColumnTypes['Not Defined'];
