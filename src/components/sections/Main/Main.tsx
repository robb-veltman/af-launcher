import React, {  useState } from 'react'
import { Typography, makeStyles, Grid } from '@material-ui/core'

import { useAppContext, useGameContext } from 'context'
import { useElectron } from 'hooks'
import { MainTabs } from './Tabs'
import { GridContainer } from 'components/Grid'

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(0, 2, 2, 2),
    background: theme.palette.primary.main,
    height: '100%',
  },

  title: {
    fontFamily: 'Nove',
    fontSize: '20vh',
    marginBottom: '-20px',
    marginLeft: '-48px',
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
      <GridContainer spacing={3} style={{ height: '100%' }}>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={8}>
          <Typography variant="h1" color="textPrimary" className={cl.title}>
            AFTERSTRIFE
          </Typography>
          <MainTabs />
        </Grid>
        <Grid item xs={4} />
      </GridContainer>
      
      {/* {isDev && (
        <>
          <button onClick={onClickTestBtn}>Test Button</button>
          <button onClick={() => setN(n + 1)}>Force Render</button>
        </>
      )}
      <button onClick={reinstallGame}>
        Reinstall
      </button>
      <Typography variant="body2" color="textPrimary" className={cl.t1}>
        App State: {appUpdateState}
      </Typography>
      <Typography variant="body2" color="textPrimary" className={cl.t2}>
        App Version: {appVersion}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        App Environment: {process.env.NODE_ENV}
      </Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        Game State: {gameUpdateState}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        Game Version: {metadata?.version}
      </Typography>
      <br />
      <Typography variant="body2" color="textPrimary">
        {metadata?.name}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        © {metadata?.company} 2022
      </Typography> */}
    </div>
  );
}