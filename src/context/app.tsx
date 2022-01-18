import React, { useEffect, useState } from 'react'

import { useElectron } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'

type AppState =
  | 'Checking'
  | 'No Updates'
  | 'Update Available'
  | 'Update Downloaded'

interface State {
  updateState: AppState
  version: string
  installUpdate: () => void
}

type AppContextType = State

const [
  AppContext,
  useAppContext
] = createContextWithDefault<AppContextType>()

const AppContextProvider: React.FC = ({ children }) => {
  const { ipcRenderer } = useElectron()
  const [updateState, setUpdateState] = useState<AppState>('Checking')
  const [version, setVersion] = useState('')
  
  useEffect(() => {
    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      setUpdateState('Checking')
    })

    ipcRenderer.on('App.ReceivedVersion', (event, version) => {
      setVersion(version)
    })
    ipcRenderer.send('App.GetVersion')

    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      ipcRenderer.removeAllListeners('AppUpdater.UpdateNotAvailable')
      setUpdateState('No Updates')
    })
    ipcRenderer.on('AppUpdater.UpdateAvailable', () => {
      ipcRenderer.removeAllListeners('AppUpdater.UpdateAvailable')
      setUpdateState('Update Available')
    })
    ipcRenderer.on('AppUpdater.Error', (event, error) => {
      ipcRenderer.removeAllListeners('AppUpdater.Error')
      console.error(error)
    })
  }, [])

  const state = {
    updateState,
    version,
    installUpdate: () => ipcRenderer.send('App.InstallUpdate')
  }
  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }