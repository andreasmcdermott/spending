import React from 'react';

export const withData = getData => Component => props =>
  <Component {...props} {...getData(props)} />;
