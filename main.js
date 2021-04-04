const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const contextMenu = require('electron-context-menu');

let mainWindow;

// Add an item to the context menu that appears only when you click on an image
contextMenu({});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, '/runejs-64.ico')
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools({
        mode: 'undocked'
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if(mainWindow === null) {
        createWindow();
    }
});
