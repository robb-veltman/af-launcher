const updater = window.require('electron-updater')

type AppUpdaterCallback = () => void
type DownloadProgressCallback = (percent: number) => void
type ErrorCallback = (error: string) => void

interface UseAppUpdaterArgs {
    onCheckingForUpdate?: AppUpdaterCallback
    onUpdateNotAvailable?: AppUpdaterCallback
    onUpdateAvailable?: AppUpdaterCallback
    OnDownloadProgress?: DownloadProgressCallback
    onUpdateDownloaded?: AppUpdaterCallback
    onError?: ErrorCallback
}

export function useAppUpdater({
    onCheckingForUpdate,
    onUpdateNotAvailable,
    onUpdateAvailable,
    OnDownloadProgress,
    onUpdateDownloaded,
    onError,
}: UseAppUpdaterArgs) {
    const { autoUpdater } = updater

    autoUpdater.on('checking-for-update', () => {
        onCheckingForUpdate && onCheckingForUpdate()
    })

    autoUpdater.on('update-not-available', () => {
        onUpdateNotAvailable && onUpdateNotAvailable()
    })

    autoUpdater.on('update-available', () => {
        onUpdateAvailable && onUpdateAvailable()
    })

    autoUpdater.on('download-progress', (progressObj) => {
        OnDownloadProgress && OnDownloadProgress(progressObj.percent)
    })

    autoUpdater.on('update-downloaded', () => {
        onUpdateDownloaded && onUpdateDownloaded()
    })

    autoUpdater.on('error', (error) => {
        onError && onError(error)
    })

}