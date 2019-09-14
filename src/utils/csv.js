import Papa from 'papaparse';

export const getHeaders = file =>
  new Promise(resolve => {
    Papa.parse(file, {
      preview: 1,
      complete: results => {
        resolve(results.data[0]);
      },
    });
  });

export const importRows = file =>
  new Promise(resolve => {
    Papa.parse(file, {
      header: true,
      trimHeaders: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: results => {
        resolve(results);
      },
    });
  });
