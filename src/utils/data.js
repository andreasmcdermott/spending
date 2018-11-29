import React from 'react';

export const withData = getData => Component => {
  return class WithData extends React.Component {
    static displayName = `WithData(${Component.name})`;

    constructor(...args) {
      super(...args);
      this.state = {
        loaded: false,
        data: null
      };
      const data = getData(this.props);
      const resolvedData = {};
      const promises = Object.entries(data).map(([key, value]) => {
        if (value instanceof Promise) {
          value.then(res => {
            resolvedData[key] = res;
          });
        } else {
          resolvedData[key] = value;
        }
        return value;
      });
      Promise.all(promises).then(() => {
        this.setState({ data: resolvedData, loaded: true });
      });
    }

    render() {
      return this.state.loaded ? <Component {...this.props} {...this.state.data} /> : null;
    }
  };
};
