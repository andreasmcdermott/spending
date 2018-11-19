import Papa from 'papaparse';

export const getHeaders = file =>
  new Promise(resolve => {
    Papa.parse(file, {
      preview: 1,
      complete: results => {
        resolve(results.data[0]);
      }
    });
  });

export const importRows = file =>
  new Promise(resolve => {
    Papa.parse(file, {
      header: true,
      trimHeaders: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transform: (value, column) => {
        if (/Date/gi.test(column)) return new Date(value);
        return value;
      },
      complete: results => {
        resolve(results);
      }
    });
  });
