import React, { useEffect, useState } from 'react'
import compareVersions from 'compare-versions'

import { GameMetadata } from 'types'
import { useGameAPI } from 'hooks'
import { createContextWithDefault } from 'util/reactContext'

import { useAppContext } from '../app'
import { GameInstallState, State } from './types'


type GameContextType = State

const [
  GameContext,
  useGameContext
] = createContextWithDefault<GameContextType>()

const GameContextProvider: React.FC = ({ children }) => {
  const { appUpdateState } = useAppContext()
  const [installState, setInstallState] = useState<GameInstallState>('Loading')
  const [metadata, setMetadata] = useState<GameMetadata>()
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [installProgress, setInstallProgress] = useState(0)

  const gameAPI = useGameAPI()

  const downloadAndInstallGame = () => gameAPI.startDownload({
    onDownloadStart: () => setInstallState('Downloading'),
    onDownloadProgress: setDownloadProgress,
    onDownloadComplete: () => setDownloadProgress(1),
    onInstallStart: () => setInstallState('Installing'),
    onInstallProgress: setInstallProgress,
    onInstallComplete: () => {
      setInstallState('Up To Date')
      setInstallProgress(1)
    },
  })

  // fetch local metadata; if not found, start game download & install
  useEffect(() => {
    if (appUpdateState !== 'Fully Updated' || installState !== 'Loading') return
    (async () => {
      setInstallState('Checking')

      const localMetadata = await gameAPI.fetchLocalMetadata()
      if (!localMetadata) {
        downloadAndInstallGame()
        return
      }
      const serverMetadata = await gameAPI.fetchServerMetadata()
      setMetadata(serverMetadata)

      const versionCompare = compareVersions(localMetadata.version, serverMetadata.version)
      console.log('VERSION COMPARE:', versionCompare)
      if (versionCompare === 0) {
        setInstallState('Up To Date')
      } else if (versionCompare === -1) {
        downloadAndInstallGame()
      } else {
        // if we somehow got a version AHEAD (should delete and re-install)
      }
    })()
  }, [appUpdateState, installState])

  const state = {
    installState,
    metadata,
    downloadProgress,
    installProgress,
  }
  return (
    <GameContext.Provider value={{ ...state }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContextProvider, useGameContext }