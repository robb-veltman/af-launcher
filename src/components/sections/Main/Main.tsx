import React, {  useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'

import { useAppContext, useGameContext } from 'context'
import { useElectron } from 'hooks'

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(2),
    background: theme.palette.bg.light,
    height: '100%',
  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState: appUpdateState, version: appVersion } = useAppContext()
  const { updateState: gameUpdateState, metadata } = useGameContext()
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
      {isDev && (
        <>
          <button onClick={onClickTestBtn}>Test Button</button>
          <button onClick={() => setN(n + 1)}>Force Render</button>
        </>
      )}
      <Typography variant="body2" color="textPrimary">
        App State: {appUpdateState}
      </Typography>
      <Typography variant="body2" color="textPrimary">
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
    </div>
  );
}