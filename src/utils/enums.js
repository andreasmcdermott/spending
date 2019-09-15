import { labelifyCamelCase } from './fns';

export const getNameByValue = (types, value) =>
  labelifyCamelCase((Object.entries(types).find(([k, v]) => v === value) || [''])[0]);
