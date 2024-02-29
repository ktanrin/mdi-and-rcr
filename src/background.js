'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require('fs')
const path = require('path')

// Define path for settings file
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// Function to read settings from a file
function readSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      const settings = JSON.parse(data);
      console.log('Settings file read:', settings);
    return settings;
    }
  } catch (error) {
    console.log('Error reading settings file:', error);
    return { arrivalATIS: '10.4.120.131', departureATIS: '10.4.120.132' }; // Return empty object if file doesn't exist or error occurs
  }
}

// Function to write settings to a file
function writeSettings(settings) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.log('Error writing settings file:', error);
    return false;
  }
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //useContentSize: true,
    //fullscreen: true,
    setResizable: false,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
mainWindow.maximize();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

// Menu template including a new item for IP settings
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Setup IP Address',
        click() {
          // Trigger an event that can be listened to in the renderer process
          createSetupWindow();
        }
      },
      {
        label: 'DevTools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
        if (focusedWindow) focusedWindow.toggleDevTools();
      }        
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
]

let serverIp = readSettings(); // Read the server IP from the settings file

let setupWindow;

function createSetupWindow() {
  // Create a new window for the IP setup
  if(!setupWindow || setupWindow.isDestroyed()){
  setupWindow = new BrowserWindow({
    width: 330, // Adjust size as needed
    height: 305,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // For security, use contextIsolation
      preload: path.join(__dirname, 'preload.js') // Use a preload script if needed
    }
  });

  setupWindow.on('closed', () => {
    setupWindow = null;
  });

  let dialogPath = isDevelopment
  ? `file://${path.join(__dirname, '..', 'public', 'server-setup-dialog.html')}`
  : `file://${path.join(process.resourcesPath, 'app.asar.unpacked', 'server-setup-dialog.html')}`;
  console.log('dialogPath', dialogPath);
  setupWindow.loadURL(dialogPath);

  // Open the DevTools if in development mode
  //setupWindow.webContents.openDevTools();

  }
  else{
    setupWindow.focus();
  }
  
}

ipcMain.on('server-ip-set', (event, ip) => {
  serverIp = ip;
  //saveServerIp(ip);
  writeSettings(ip);
  console.log('Server IP set to',serverIp); // Do something with the server IP
  //showServerSetupDialog();
  event.sender.send('server-ip-updated', serverIp);
  // Here you would store the IP and use it for your socket connection
  BrowserWindow.getAllWindows().forEach(window => {
    window.webContents.send('server-ip-updated', serverIp);
  });
});

ipcMain.handle('get-server-ip', async () => {
  //console.log('get-server-ip',serverIp);
  return serverIp;
});



// Apply menu
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
})

// Handle IPC events
ipcMain.handle('get-settings', async (event) => {
  return readSettings(); // Send settings to renderer
});

ipcMain.handle('save-settings', async (event, settings) => {
  return writeSettings(settings); // Receive settings from renderer and save
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle('load-audio', async (event, fileName) => {
  // Construct the path to the audio file
  const filePath = path.join(app.getAppPath(), fileName);
  console.log('Loading audio file:', filePath);
  try {
    // Read the file as a buffer
    const audioBuffer = fs.readFileSync(filePath);
    // Return the buffer data
    console.log('Audio file loaded:', audioBuffer);
    return audioBuffer;
  } catch (error) {
    console.error('Error loading audio file:', error);
    throw error; // Propagate the error back to the renderer process
  }
 });

