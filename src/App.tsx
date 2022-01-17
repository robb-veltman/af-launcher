import React, { useEffect } from 'react'
import { useStyles } from './style'

import { useElectron, useAppUpdater } from 'hooks'

export const App: React.FC = () => {
  const cl = useStyles()
  
  const { ipcRenderer } = useElectron()
  console.log({ useAppUpdater })
  useEffect(() => {
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version')
      document.getElementById('version')!.innerText = 'Version ' + arg.version
    })
    ipcRenderer.send('app_version');

    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      console.log('update not available...')
    })
  }, [])
  
  return (
    <div className={cl.app}>
      <header className="App-header">
        <p id="version"></p>
        <p id="update">Checking for updates...</p>
      </header>
    </div>
  );
}
