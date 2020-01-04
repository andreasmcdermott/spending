import store from './store';

export function goto(to) {
  if (to.startsWith('/')) {
    store.set(to);
    return;
  }
  const gotoParts = to.split('/');
  store.update(curr => {
    const currParts = curr.split('/');
    return gotoParts
      .reduce((acc, p) => {
        if (p === '..') acc.pop();
        else if (p === '.') {
          /* do nothing */
        } else acc.push(p);
        return acc;
      }, currParts)
      .join('/');
  });
}
