import { useElectron } from 'hooks/useElectron'

export function useAppAPI() {
  const { ipcRenderer } = useElectron()

  const fetchVersion = () => new Promise<string>((resolve, reject) => {
    ipcRenderer.on('App.Version.Response', (event, { version }) => {
      ipcRenderer.removeAllListeners('App.ReceivedVersion')
      resolve(version)
    })
    ipcRenderer.send('App.Version.Request')
  })

  return {
    fetchVersion,
  }
}