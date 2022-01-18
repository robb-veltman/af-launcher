const path = require('path')

const { app, BrowserWindow, ipcMain, Menu } = require('electron')
// this makes it so that we don't display a menu bar, and can't do shortcuts
// like F11 for fullscreen, ctrl+R for refresh, etc
Menu.setApplicationMenu(false)

const isDev = require('electron-is-dev')

const { autoUpdater } = require('electron-updater')
const log = require('electron-log')
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('------------------------------')
log.info('App starting...')
log.info('------------------------------')

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      //enableRemoteModule: true,
      contextIsolation: false,
      autoHideMenuBar: true,
    },
  })
  mainWindow.autoHideMenuBar = true

  // and load the index.html of the app.
  // win.loadFile("index.html")
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
    // setTimeout(() => {
    //   console.log('--------------?')
    //   win.webContents.send('Test', 'ayo', 'ayo?')
    // }, 2000)
  })

  mainWindow.on('show', () => mainWindow.focus())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const sendToWindow = (eventName, ...args) => {
  mainWindow.webContents.send(eventName, ...args)
}

// Auto updater events
autoUpdater.on('checking-for-update', () => {
  sendToWindow('AppUpdater.CheckingForUpdate')
})

autoUpdater.on('update-not-available', () => {
  sendToWindow('AppUpdater.UpdateNotAvailable')
})

autoUpdater.on('update-available', () => {
  sendToWindow('AppUpdater.UpdateAvailable')
})

autoUpdater.on('download-progress', (progressObj) => {
  sendToWindow('AppUpdater.DownloadProgress', progressObj.percent)
})

autoUpdater.on('update-downloaded', () => {
  sendToWindow('AppUpdater.UpdateDownloaded')
})

autoUpdater.on('error', (error) => {
  sendToWindow(`AppUpdater.Error`, error)
})

// Other events
ipcMain.on('App.GetVersion', (event) => {
  const version = app.getVersion()
  sendToWindow('App.ReceivedVersion', version)
})

ipcMain.on('App.InstallUpdate', () => {
  autoUpdater.quitAndInstall()
})




