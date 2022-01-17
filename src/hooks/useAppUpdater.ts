const updater = window.require('electron-updater')

export function useAppUpdater() {
    const { autoUpdater } = updater
    autoUpdater.on('checking-for-update', () => {
        console.log('AppUpdater.CheckingForUpdate')
    })

    autoUpdater.on('update-not-available', () => {
        console.log('AppUpdater.UpdateNotAvailable')
    })

    autoUpdater.on('update-available', () => {
        console.log('AppUpdater.UpdateAvailable')
    })

    autoUpdater.on('download-progress', (progressObj) => {
        console.log(`AppUpdater.DownloadProgress::${progressObj.percent}`)
    })

    autoUpdater.on('update-downloaded', () => {
        console.log('AppUpdater.UpdateDownloaded')
    })

    autoUpdater.on('error', (error) => {
        console.log(`AppUpdater.Error::${error}`)
    })

}