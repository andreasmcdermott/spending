import React from 'react';
import { onDbReady } from '../utils/db';

export default class DatabaseLoader extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
    onDbReady(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}
