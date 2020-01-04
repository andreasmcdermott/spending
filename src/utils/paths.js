import { remote } from 'electron';
import path from 'path';

export default {
  userData(...paths) {
    const userDataPath = remote.app.getPath('userData');
    return path.resolve(userDataPath, ...paths);
  }
};
