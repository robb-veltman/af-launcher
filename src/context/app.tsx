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
  updateDownloadPercent: number
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
  const [updateDownloadPercent, setUpdateDownloadPercent] = useState(0)
  
  useEffect(() => {
    ipcRenderer.on('App.ReceivedVersion', (event, version) => {
      ipcRenderer.removeAllListeners('App.ReceivedVersion')
      setVersion(version)
    })
    ipcRenderer.send('App.GetVersion')

    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      setUpdateState('Checking')
    })
    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      setUpdateState('No Updates')
    })
    ipcRenderer.on('AppUpdater.UpdateAvailable', () => {
      setUpdateState('Update Available')
    })
    ipcRenderer.on('AppUpdater.DownloadProgress', (event, percent) => {
      setUpdateDownloadPercent(percent)
    })
    ipcRenderer.on('AppUpdater.UpdateDownloaded', () => {
      setUpdateState('Update Downloaded')
    })
    ipcRenderer.on('AppUpdater.Error', (event, error) => {
      console.error(error)
    })
  }, [])

  const state = {
    updateState,
    version,
    updateDownloadPercent,
    installUpdate: () => ipcRenderer.send('App.InstallUpdate')
  }
  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }