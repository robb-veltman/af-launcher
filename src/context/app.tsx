import React, { useEffect, useState } from 'react'

import { useElectron } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'
import { UpdateModal } from 'components/UpdateModal'

type AppState =
  | 'Checking'
  | 'No Updates'
  | 'Update Available'
  | 'Update Downloaded'
  | 'Fully Updated'

interface State {
  updateState: AppState
  version: string
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
    if (updateState === 'Update Downloaded') {
      setTimeout(() => ipcRenderer.send('App.InstallUpdate'), 1000)
    } else if (updateState === 'No Updates') {
      setTimeout(() => setUpdateState('Fully Updated'), 1000)
    }
  }, [updateState])

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
      setTimeout(() => setUpdateState('No Updates'), 1000)
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
  }
  const isUpdateModalOpen = updateState !== 'Fully Updated'
  return (
    <AppContext.Provider value={{ ...state }}>
      <UpdateModal open={isUpdateModalOpen} />
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }