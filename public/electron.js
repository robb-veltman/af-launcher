const path = require('path')

const { app, BrowserWindow, ipcMain, Menu } = require('electron')
Menu.setApplicationMenu(false)

const isDev = require('electron-is-dev')

const { autoUpdater } = require('electron-updater')
const log = require('electron-log')
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('------------------------------')
log.info('App starting...')
log.info('------------------------------')

let win
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      //enableRemoteModule: true,
      contextIsolation: false,
      autoHideMenuBar: true,
    },
  })
  win.autoHideMenuBar = true

  // and load the index.html of the app.
  // win.loadFile("index.html")
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
    // setTimeout(() => {
    //   console.log('--------------?')
    //   win.webContents.send('Test', 'ayo', 'ayo?')
    // }, 2000)
  })

  win.on('show', () => win.focus())
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

autoUpdater.on('checking-for-update', () => {
  console.log("sending: check")
  win.webContents.send('AppUpdater.CheckingForUpdate')
  win.webContents.send('Test::Yo')
})

autoUpdater.on('update-not-available', () => {
  console.log("sending: not avail")
  win.webContents.send('AppUpdater.UpdateNotAvailable')
})

autoUpdater.on('update-available', () => {
  console.log("sending: avail")
  win.webContents.send('AppUpdater.UpdateAvailable')
})

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('AppUpdater.DownloadProgress', progressObj.percent)
})

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('AppUpdater.UpdateDownloaded')
})

autoUpdater.on('error', (error) => {
  win.webContents.send(`AppUpdater.Error`, error)
})

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() })
})

ipcMain.on('install_autoupdate', () => {
  autoUpdater.quitAndInstall()
})



