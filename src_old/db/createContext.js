import React from 'react';

export default function createContext(dbInstance) {
  return React.createContext(dbInstance);
}
