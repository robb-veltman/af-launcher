import React, { useEffect, useState } from 'react'

import { useElectron, useAppAPI } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'
import { UpdateModal } from 'components/UpdateModal'

type AppUpdateState =
  | 'Checking'
  | 'No Updates'
  | 'Update Available'
  | 'Update Downloaded'
  | 'Fully Updated'

interface State {
  appUpdateState: AppUpdateState
  appVersion: string
  appUpdateDownloadPercent: number
}

type AppContextType = State

const [
  AppContext,
  useAppContext
] = createContextWithDefault<AppContextType>()

const AppContextProvider: React.FC = ({ children }) => {
  const { ipcRenderer } = useElectron()
  const appAPI = useAppAPI()
  const [appUpdateState, setAppUpdateState] = useState<AppUpdateState>('Checking')
  const [appVersion, setAppVersion] = useState('')
  const [appUpdateDownloadPercent, setAppUpdateDownloadPercent] = useState(0)

  useEffect(() => {
    if (appUpdateState === 'Update Downloaded') {
      setTimeout(() => ipcRenderer.send('App.InstallUpdate'), 1000)
    }
  }, [appUpdateState])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setAppUpdateState('Fully Updated')
    }
    
    appAPI.fetchVersion().then(setAppVersion)

    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      setAppUpdateState('Checking')
    })
    ipcRenderer.on('AppUpdater.UpdateNotAvailable', () => {
      setTimeout(() => setAppUpdateState('No Updates'), 750)
      setTimeout(() => setAppUpdateState('Fully Updated'), 1500)
    })
    ipcRenderer.on('AppUpdater.UpdateAvailable', () => {
      setAppUpdateState('Update Available')
    })
    ipcRenderer.on('AppUpdater.DownloadProgress', (event, percent) => {
      setAppUpdateDownloadPercent(percent)
    })
    ipcRenderer.on('AppUpdater.UpdateDownloaded', () => {
      setAppUpdateDownloadPercent(100)
      setTimeout(() => setAppUpdateState('Update Downloaded'), 1000)
    })
    ipcRenderer.on('AppUpdater.Error', (event, error) => {
      console.error(error)
    })
  }, [])

  const state = {
    appUpdateState,
    appVersion,
    appUpdateDownloadPercent,
  }
  const isUpdateModalOpen = appUpdateState !== 'Fully Updated'
  return (
    <AppContext.Provider value={{ ...state }}>
      <UpdateModal open={isUpdateModalOpen} />
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }