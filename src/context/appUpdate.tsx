import React, { useEffect, useState } from 'react'

import { useElectron } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'

type AppUpdateState =
  | 'Checking'
  | 'No Updates'
  | 'Update Available'
  | 'Downloaded Update'

interface State {
  updateState: AppUpdateState
}

type AppUpdateContextType = State

const [
  AppUpdateContext,
  useAppUpdateContext
] = createContextWithDefault<AppUpdateContextType>()

const AppUpdateContextProvider: React.FC = ({ children }) => {
  const { ipcRenderer } = useElectron()
  const [updateState, setUpdateState] = useState<AppUpdateState>('Checking')
  
  useEffect(() => {
    ipcRenderer.on('AppUpdater.CheckingForUpdate', () => {
      setUpdateState('Checking')
    })

    // ipcRenderer.on('Test', (event, message1, message2) => {
    //   console.log("-- received: test", message1, message2)
    //   console.log({ event })
    // })

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
  }
  return (
    <AppUpdateContext.Provider value={{ ...state }}>
      {children}
    </AppUpdateContext.Provider>
  )
}

export { AppUpdateContextProvider, useAppUpdateContext }