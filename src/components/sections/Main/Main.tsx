import React, {  useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'

import { useAppContext, useGameContext } from 'context'
import { useElectron } from 'hooks'
import { MainTabs } from './Tabs'
import { GridContainer } from 'components/Grid'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
    marginLeft: '5vw',
  },
  title: {
    zIndex: 1,
    fontFamily: 'Nove',
    fontSize: '80px',
    marginBottom: '-15px',
    marginLeft: '-40px',
    textShadow: '5px 5px black',
  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState: appUpdateState, version: appVersion } = useAppContext()
  const { updateState: gameUpdateState, metadata, reinstallGame } = useGameContext()
  const { ipcRenderer } = useElectron()
  const onClickTestBtn = () => {
    // ipcRenderer.send('Game.Download.Start')
    // ipcRenderer.send('Game.InstallInfo.Request')
    // ipcRenderer.send('Game.Start')
    // ipcRenderer.send('App.Minimize')
    ipcRenderer.send('App.Close')
  }
  const [n, setN] = useState(0)
  const isDev = process.env.NODE_ENV === 'development'
  return (
    <div className={cl.main}>
      <Typography variant="h1" color="textPrimary" className={cl.title}>
        AFTERSTRIFE
      </Typography>
      <MainTabs />
    </div>
  );
}