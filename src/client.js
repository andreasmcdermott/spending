import React from 'react';
import { render } from 'react-dom';
import App from './App';

const createRootNode = () => {
  const el = document.createElement('DIV');
  document.body.prepend(el);
  return el;
};

const root = createRootNode();
render(<App />, root);

// const Papa = require('papaparse');

// const input = document.getElementById('fileInput');
// const output = document.getElementById('output');

// input.addEventListener('change', e => {
//   const file = e.target.files[0];
//   getHeaders(file);
// });

// function getHeaders(file) {
//   Papa.parse(file, {
//     preview: 1,
//     complete: (results, file) => {
//       output.innerHTML = JSON.stringify(results, null, 2);
//     }
//   });
// }

// function importRows(file) {
//   Papa.parse(file, {
//     header: true,
//     trimHeaders: true,
//     skipEmptyLines: true,
//     dynamicTyping: true,
//     transform: (value, column) => {
//       if (/Date/gi.test(column)) return new Date(value);
//       return value;
//     },
//     complete: (results, file) => {
//       output.innerHTML = JSON.stringify(results, null, 2);
//     }
//   });
// }
