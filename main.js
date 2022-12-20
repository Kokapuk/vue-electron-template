const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      symbolColor: '#ffffff',
      color: '#121212',
      height: 30,
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: !isDev,
    },
  });

  if (isDev) {
    win.loadURL('http://127.0.0.1:5173/');
  } else {
    win.loadFile(path.join(__dirname, './dist/vue/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
