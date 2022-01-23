import React, { useEffect, useReducer, useState } from 'react'
import compareVersions from 'compare-versions'

import { GameMetadata } from 'types'
import { useGameAPI } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'

import { useAppContext } from '../app'
import { State } from './types'
import { Action, reducer } from './reducer'


interface GameContextType extends State {
  dispatch: React.Dispatch<Action>
}

const [
  GameContext,
  useGameContext
] = createContextWithDefault<GameContextType>()

const GameContextProvider: React.FC = ({ children }) => {
  const { updateState: appUpdateState } = useAppContext()
  const [metadata, setMetadata] = useState<GameMetadata>()

  const [state, dispatch] = useReducer(reducer, {
    updateState: 'Loading',
    installProgress: 0,
    downloadProgress: 0,
  })

  const gameAPI = useGameAPI()

  const downloadAndInstallGame = () => gameAPI.startDownload({
    onDownloadStart: () => dispatch({ tag: 'Install.Download.Start' }),
    onDownloadProgress: progress => dispatch({ tag: 'Install.Download.Progress', progress }),
    onDownloadComplete: () => dispatch({ tag: 'Install.Download.Complete' }),
    onInstallStart: () => dispatch({ tag: 'Install.Install.Start' }),
    onInstallProgress: progress => dispatch({ tag: 'Install.Install.Progress', progress }),
    onInstallComplete: () => dispatch({ tag: 'Install.Install.Complete' }),
  })

  useEffect(() => {
    if (appUpdateState !== 'Up To Date' || state.updateState !== 'Loading') return
    (async () => {
      dispatch({ tag: 'Install.Check' })

      const serverMetadata = await gameAPI.fetchServerMetadata()
      setMetadata(serverMetadata)
      
      const localMetadata = await gameAPI.fetchLocalMetadata()
      if (!localMetadata) {
        downloadAndInstallGame()
        return
      }

      const versionCompare = compareVersions(localMetadata.version, serverMetadata.version)
      console.log('VERSION COMPARE:', versionCompare)
      if (versionCompare === 0) {
        dispatch({ tag: 'Install.Install.Complete' })
      } else if (versionCompare === -1) {
        downloadAndInstallGame()
      } else {
        // if we somehow got a version AHEAD of the server, we fully delete & re-install
        // (currently, this is the default functionality, so we just repeat it here for now)
        downloadAndInstallGame()
      }
    })()
  }, [appUpdateState, state.updateState])

  return (
    <GameContext.Provider value={{ ...state, metadata, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider, useGameContext }