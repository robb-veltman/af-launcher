import { useElectron } from 'hooks/useElectron'

interface CheckForUpdateArgs {
  onUpdateNotAvailable: () => void
  onUpdateAvailable: () => void
  onDownloadProgress: (progress: number) => void
  onDownloadComplete: () => void
  onError?: (error: string) => void
}

export function useAppAPI() {
  const { ipcRenderer } = useElectron()

  const fetchVersion = () => new Promise<string>((resolve, reject) => {
    ipcRenderer.on('App.Version.Response', (event, { version }) => {
      ipcRenderer.removeAllListeners('App.ReceivedVersion')
      resolve(version)
    })
    ipcRenderer.send('App.Version.Request')
  })

  const checkForUpdate = ({
    onUpdateNotAvailable,
    onUpdateAvailable,
    onDownloadProgress,
    onDownloadComplete,
    onError,
  }: CheckForUpdateArgs) => {
    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      // do we really need anything here?
    })
    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      ipcRenderer.removeAllListeners('AppUpdater.UpdateNotAvailable')
      onUpdateNotAvailable()
    })
    ipcRenderer.on('AppUpdater.UpdateAvailable', () => {
      ipcRenderer.removeAllListeners('AppUpdater.UpdateAvailable')
      onUpdateAvailable()
    })
    ipcRenderer.on('AppUpdater.DownloadProgress', (event, { progress }) => {
      onDownloadProgress(progress)
    })
    ipcRenderer.on('AppUpdater.UpdateDownloaded', () => {
      ipcRenderer.removeAllListeners('AppUpdater.UpdateDownloaded')
      onDownloadComplete()
    })
    ipcRenderer.on('AppUpdater.Error', (event, { error }) => {
      console.error(error)
      if (onError) onError(error)
    })

    ipcRenderer.send('App.CheckForUpdate')
  }

  const minimize = () => {
    ipcRenderer.send('App.Minimize')
  }

  const maximize = () => {
    ipcRenderer.send('App.Maximize')
  }

  const close = () => {
    ipcRenderer.send('App.Close')
  }

  return {
    fetchVersion,
    checkForUpdate,
    minimize,
    maximize,
    close,
  }
}