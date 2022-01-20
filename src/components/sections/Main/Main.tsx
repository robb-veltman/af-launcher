import React from 'react'
import { Theme, Typography, makeStyles } from '@material-ui/core'

import { useAppContext } from 'context'

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(2),
  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState, version } = useAppContext()

  return (
    <div className={cl.main}>
      <Typography variant="body1" color="textPrimary">
        hello
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Update State: {updateState}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Version: {version}
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Env: {process.env.NODE_ENV}
      </Typography>
    </div>
  );
}