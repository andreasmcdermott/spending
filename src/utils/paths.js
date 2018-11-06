import { remote } from 'electron';
import path from 'path';

const USER_DATA_PATH = remote.app.getPath('userData');

export default {
  userData(...paths) {
    return path.resolve(USER_DATA_PATH, ...paths);
  }
};
