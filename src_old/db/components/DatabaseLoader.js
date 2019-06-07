import React from 'react';
import getDb from '../db';
import createContext from '../createContext';

const db = getDb();
const DatabaseContext = createContext(db);

export default class DatabaseLoader extends React.Component {
  state = { loaded: false };

  componentDidMount() {
    db.loadFromFile('main.db').then(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}
