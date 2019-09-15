import store from './store';

export function goto(to) {
  store.set(to);
}
