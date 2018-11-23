import React from 'react';
import { getDbReady } from '../utils/db';

export default class DatabaseLoader extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
    getDbReady(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}
