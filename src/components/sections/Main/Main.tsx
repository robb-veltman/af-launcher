import React, {  useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'

import { useAppContext, useGameContext } from 'context'
import { useElectron } from 'hooks'
import { ProgressBar } from 'components/ProgressBar'

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(2),
  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  const { appUpdateState, appVersion } = useAppContext()
  const { installState, installProgress, downloadProgress } = useGameContext()
  const { ipcRenderer } = useElectron()
  const onClickTestBtn = () => {
    ipcRenderer.send('Game.Download.Start')
    // ipcRenderer.send('Game.InstallInfo.Request')
  }
  const [n, setN] = useState(0)
  return (
    <div className={cl.main}>
      <button onClick={onClickTestBtn}>test button</button>
      <button onClick={() => setN(n + 1)}>force render update</button>
      <Typography variant="body1" color="textPrimary">
        App State: {appUpdateState}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Install State: {installState}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Game Download Progress: {downloadProgress}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Game Install Progress: {installProgress}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Version: {appVersion}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Env: {process.env.NODE_ENV}
      </Typography>
      <ProgressBar progress={downloadProgress * 100} />
    </div>
  );
}