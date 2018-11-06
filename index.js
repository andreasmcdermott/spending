const path = require('path');
const { app, BrowserWindow } = require('electron');
const url = require('url');

let mainWindow = null;
const rootFolder = path.resolve(__dirname);
const debug = process.env.ENV === 'development';

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  if (debug) mainWindow.loadURL('http://localhost:9000/index.html');
  else mainWindow.loadFile(path.resolve(rootFolder, 'dist', 'index.html'));

  if (debug) {
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    if (debug) app.quit();
    else mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
