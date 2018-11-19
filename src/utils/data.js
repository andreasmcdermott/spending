import React from 'react';

export const withData = getData => Component => props => <Component {...getData(props)} />;
