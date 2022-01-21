import { GameMetadata } from 'types'
import { useElectron } from './useElectron'

const METADATA_URL =
  'https://afterstrife-build.nyc3.cdn.digitaloceanspaces.com/AfterStrifeClosedTest/metadata.json'

interface StartDownloadArgs {
  onDownloadStart: () => void
  onDownloadProgress: (progress: number) => void
  onDownloadComplete?: () => void
  onInstallStart: () => void
  onInstallProgress: (progress: number) => void
  onInstallComplete: () => void
}

export function useGameAPI() {
  const { ipcRenderer } = useElectron()

  const fetchLocalMetadata = () => new Promise<GameMetadata>((resolve, reject) => {
    ipcRenderer.on('Game.InstallInfo.Response', (event, data) => {
      const metadata = data?.metadata
      resolve(metadata)
    })
    ipcRenderer.send('Game.InstallInfo.Request')
  }) 

  const fetchServerMetadata = async () => {
    const response = await fetch(METADATA_URL)
    const metadata = await response.json() as GameMetadata
    return metadata
  }

  const startDownload = ({
    onDownloadStart,
    onDownloadProgress,
    onDownloadComplete,
    onInstallStart,
    onInstallProgress,
    onInstallComplete,
  }: StartDownloadArgs) => {
    onDownloadStart()
    ipcRenderer.on('Game.Download.Progress', (e, { progress }) => onDownloadProgress(progress))
    ipcRenderer.on('Game.Download.Complete', () => onDownloadComplete && onDownloadComplete())
    ipcRenderer.on('Game.Install.Start', onInstallStart)
    ipcRenderer.on('Game.Install.Progress', (e, { progress }) => onInstallProgress(progress))
    ipcRenderer.on('Game.Install.Complete', onInstallComplete)

    ipcRenderer.send('Game.Download.Start')
  }

  return {
    fetchLocalMetadata,
    fetchServerMetadata,
    startDownload,
  }
}