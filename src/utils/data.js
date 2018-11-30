import React from 'react';

export const withData = (getData, watchedProps) => Component => {
  return class WithData extends React.Component {
    static displayName = `WithData(${Component.name})`;

    constructor(...args) {
      super(...args);
      this.state = {
        data: null
      };
      this.loadData();
    }

    loadData() {
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
        this.setState({ data: resolvedData });
      });
    }

    componentDidUpdate(prevProps) {
      if (!watchedProps) return;
      if (watchedProps.some(key => this.props[key] !== prevProps[key])) {
        this.setState(
          {
            data: null
          },
          () => {
            this.loadData();
          }
        );
      }
    }

    render() {
      return !!this.state.data ? <Component {...this.props} {...this.state.data} /> : null;
    }
  };
};
