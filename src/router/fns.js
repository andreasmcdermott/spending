import store from './store';

export function goto(to) {
  if (to === '..') {
    store.update(curr => {
      const parts = curr.split('/');
      parts.pop();
      return parts.join('/');
    });
  } else {
    store.set(to);
  }
}
