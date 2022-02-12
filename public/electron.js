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

const { PATHS } = require('./_paths')

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
    height: 500,
    resizable: false,
    frame: false,
    transparent: true,
    roundedCorners: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: !isDev,
      contextIsolation: false,
    },
  })
  mainWindow.autoHideMenuBar = true

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${PATHS.index}`)
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow.once('ready-to-show', () => {
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

ipcMain.on('App.Maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow.maximize()
  }
})

ipcMain.on('App.Close', () => {
  mainWindow.close()
})

const { FileUtil } = require('./_fileUtil')

ipcMain.on('Game.Start', () => {
  execFile(PATHS.gameExe, (error, data) => {
    if (error) {
      console.error('Execute file error:', error)
    }
    if (data) {
      console.log('Execute file data:', data)
    }
  })
})

ipcMain.on('Game.Download.Start', async () => {
  FileUtil.clearGameDirectoryContents()
  const url = 'https://afterstrife-build.nyc3.cdn.digitaloceanspaces.com/AfterStrifeClosedTest/Game.zip'
  const filename = 'Game.zip'
  try {
    await download(
      mainWindow,
      url,
      {
        filename,
        directory: PATHS.afterStrifeDir,
        onStarted: item => {
        },
        onProgress: ({ percent }) => sendToWindow('Game.Download.Progress', { progress: percent }),
        onCompleted: item => sendToWindow('Game.Download.Complete', { item }),
        onCancel: item => {
          log.info('Download was canceled.')
          sendToWindow('Game.Download.Canceled', item)
        }
      }
    )

    sendToWindow('Game.Install.Start')
    log.info('Game download complete. Starting Unzip...')

    FileUtil.unzipGame({
      onProgress: ({ progress }) => sendToWindow('Game.Install.Progress', { progress }),
      onComplete: () => sendToWindow('Game.Install.Complete'),
      onError: error => {
        console.error('Zip extract error:', error)
        log.error(error)
      },
    })
  } catch (error) {
    console.error(error)
    log.error(error)
  }
})

ipcMain.on('Game.InstallInfo.Request', () => {
  const afterStrifeDirContents = FileUtil.getAfterStrifeDirContents()
  console.log('afterStrifeDirContents:', afterStrifeDirContents)

  if (!afterStrifeDirContents.includes('Game')) {
    sendToWindow('Game.InstallInfo.Response')
    return
  }

  const gameDirContents = FileUtil.getGameDirContents()
  console.log('gameDirContents', gameDirContents)
  if (!gameDirContents.includes('metadata.json')) {
    sendToWindow('Game.InstallInfo.Response')
    return
  }

  const metadata = require(PATHS.metadata)
  sendToWindow('Game.InstallInfo.Response', { metadata })
})
