import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  patchNotes: {

  },
  header: {
    fontFamily: 'Nove',
    marginBottom: theme.spacing(1),
  },
}))

export const PatchNotesTab: React.FC = () => {
  const cl = useStyles()
  return (
    <div>
      <Typography variant="h5" color="textPrimary" className={cl.header}>
        Patch Notes
      </Typography>
    </div>
  )
}