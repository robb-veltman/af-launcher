const path = require('path')
const execFile = require('child_process').execFile

const { app, BrowserWindow, ipcMain, Menu } = require('electron')
// this makes it so that we don't display a menu bar, and can't do shortcuts
// like F11 for fullscreen, ctrl+R for refresh, etc
Menu.setApplicationMenu(false)

const isDev = require('electron-is-dev')

const { autoUpdater } = require('electron-updater')
const { download } = require('electron-dl')
const fs = require('fs')
const DecompressZip = require('decompress-zip');

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
    frame: false,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      //enableRemoteModule: true,
      contextIsolation: false,
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
    // setTimeout(() => {
    //   console.log('--------------?')
    //   win.webContents.send('Test', 'ayo', 'ayo?')
    // }, 2000)
  })

  mainWindow.on('show', () => {
    mainWindow.focus()
  })
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

// app updater events
ipcMain.on('App.CheckForUpdate', () => {
  autoUpdater.checkForUpdatesAndNotify()
})

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
  sendToWindow('AppUpdater.DownloadProgress', { progress: progressObj.percent })
})

autoUpdater.on('update-downloaded', () => {
  sendToWindow('AppUpdater.UpdateDownloaded')
})

autoUpdater.on('error', (error) => {
  sendToWindow(`AppUpdater.Error`, { error })
})

// app events
ipcMain.on('App.Version.Request', (event) => {
  const version = app.getVersion()
  sendToWindow('App.Version.Response', { version })
})

ipcMain.on('App.InstallUpdate', () => {
  autoUpdater.quitAndInstall(true, true)
})

ipcMain.on('App.Minimize', () => {
  mainWindow.minimize()
})

ipcMain.on('App.Close', () => {
  mainWindow.close()
})

// game events
const clearDirectoryContents = () => {
  const mainDirectoryContents = fs.readdirSync(_dir)
  if (mainDirectoryContents.includes('Game.zip')) {
    fs.unlinkSync(_dir + '/Game.zip')
  }
  if (mainDirectoryContents.includes('Game')) {
    fs.rmdir(_dir + '/Game', { recursive: true }, (err) => {
      if (err) {
        log.error(err)
        throw (err)
      }
    })
  }
}

// const DIRECTORY = app.getPath('downloads') + '/AfterStrife'
const _dir = app.getPath('downloads') + '/test-app'

ipcMain.on('Game.Start', () => {
  const exePath = _dir + '/Game/AfterStrife.exe'
  execFile(exePath, (error, data) => {
    if (error) console.error('Execute file error:', error)
    if (data) console.log('Execute file data:', data)
  })
})

ipcMain.on('Game.Download.Start', async () => {
  clearDirectoryContents()
  const url = 'https://afterstrife-build.nyc3.cdn.digitaloceanspaces.com/AfterStrifeClosedTest/Game.zip'
  const filename = 'Game.zip'
  await download(
    mainWindow,
    url,
    {
      filename,
      directory: _dir,
      onProgress: ({ percent }) => sendToWindow('Game.Download.Progress', { progress: percent }),
      onCompleted: item => sendToWindow('Game.Download.Complete', { item }),
    }
  )
  sendToWindow('Game.Install.Start')
  const unzipper = new DecompressZip(_dir + '/Game.zip')
  unzipper.on('error', (err) => {
    console.error('extraction error:', err)
    log.error(err)
  })
  unzipper.on('extract', () => {
    sendToWindow('Game.Install.Complete')
    log.info('done extracting')
  })
  unzipper.on('progress', (fileIndex, fileCount) => {
    const progress = fileIndex / fileCount
    sendToWindow('Game.Install.Progress', { progress })
  })
  unzipper.extract({
    path: _dir + '/Game',
    restrict: false,
  })
})

ipcMain.on('Game.InstallInfo.Request', () => {
  const mainDirectoryContents = fs.readdirSync(_dir)

  if (!mainDirectoryContents.includes('Game')) {
    sendToWindow('Game.InstallInfo.Response')
    return
  }

  const gameDirectory = _dir + '/Game'
  const gameDirectoryContents = fs.readdirSync(gameDirectory)
  if (!gameDirectoryContents.includes('metadata.json')) {
    sendToWindow('Game.InstallInfo.Response')
    return
  }

  let metadata = require(gameDirectory + '/metadata.json')
  sendToWindow('Game.InstallInfo.Response', { metadata })
})
