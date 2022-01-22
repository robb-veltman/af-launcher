import React, { useEffect, useState } from 'react'

import { useElectron, useAppAPI } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'
import { UpdateModal } from 'components/UpdateModal'

type AppUpdateState =
  | 'Checking'
  | 'No Updates'
  | 'Update Available'
  | 'Update Downloaded'
  | 'Up To Date'

interface State {
  updateState: AppUpdateState
  version: string
  downloadProgress: number
}

type AppContextType = State

const [
  AppContext,
  useAppContext
] = createContextWithDefault<AppContextType>()

const AppContextProvider: React.FC = ({ children }) => {
  const { ipcRenderer } = useElectron()
  const appAPI = useAppAPI()
  const [updateState, setUpdateState] = useState<AppUpdateState>('Checking')
  const [version, setVersion] = useState('')
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    if (updateState === 'Update Downloaded') {
      setTimeout(() => ipcRenderer.send('App.InstallUpdate'), 1000)
    }
  }, [updateState])

  useEffect(() => {
    (async () => {
      const version = await appAPI.fetchVersion()
      setVersion(version)
      if (process.env.NODE_ENV === 'development') {
        setUpdateState('Up To Date')
        return
      }
      setUpdateState('Checking')
      appAPI.checkForUpdate({
        onUpdateNotAvailable: () => {
          setTimeout(() => setUpdateState('No Updates'), 750)
          setTimeout(() => setUpdateState('Up To Date'), 1500)
        },
        onUpdateAvailable: () => setUpdateState('Update Available'),
        onDownloadProgress: setDownloadProgress,
        onDownloadComplete: () => {
          setDownloadProgress(100)
          setTimeout(() => setUpdateState('Update Downloaded'), 1000)
        }
      })
    })()
  }, [])

  const state = {
    updateState,
    version,
    downloadProgress,
  }
  const isUpdateModalOpen = updateState !== 'Up To Date'
  return (
    <AppContext.Provider value={{ ...state }}>
      <UpdateModal open={isUpdateModalOpen} />
      {children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, useAppContext }