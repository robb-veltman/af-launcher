import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  download: {
    padding: theme.spacing(2),
  },
}))

export const Download: React.FC = () => {
  const cl = useStyles()
  return (
    <div className={cl.download}>
      <Typography variant="body1" color="textPrimary">
        Download section
      </Typography>
    </div>
  )
}