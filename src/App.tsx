import React, { useEffect } from 'react'
import { useStyles } from './style'

import { useElectron } from 'hooks'

export const App: React.FC = () => {
  const cl = useStyles()

  // const appUpdater = useAppUpdater({
  //   onCheckingForUpdate: () => setUpdateElText('Checking for update'),
  //   onUpdateNotAvailable: () => setUpdateElText('No updates'),
  //   onUpdateAvailable: () => setUpdateElText('Update available'),
  // })

  const { ipcRenderer } = useElectron()
  // useEffect(() => {
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version')
      document.getElementById('version')!.innerText = 'Version ' + arg.version
    })
    ipcRenderer.send('app_version');
    
    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      console.log("-- received: check")
      document.getElementById('update')!.innerText = 'Checking for update'
    })
    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      console.log("-- received: not avail")
      ipcRenderer.removeAllListeners('AppUpdater.UpdateNotAvailable')
      document.getElementById('update')!.innerText = 'No updates'
    })
    ipcRenderer.on('AppUpdater.UpdateAvailable', () => {
      console.log("-- received: avail")
      ipcRenderer.removeAllListeners('AppUpdater.UpdateAvailable')
      document.getElementById('update')!.innerText = 'Update available'
    })
    ipcRenderer.on('AppUpdater.Error', () => {
      console.log("-- received: error")
      ipcRenderer.removeAllListeners('AppUpdater.Error')
      document.getElementById('update')!.innerText = 'Error'
    })
  // }, [])
  
  return (
    <div className={cl.app}>
      <header className="App-header">
        <p id="version"></p>
        <p id="update">...</p>
      </header>
    </div>
  );
}
