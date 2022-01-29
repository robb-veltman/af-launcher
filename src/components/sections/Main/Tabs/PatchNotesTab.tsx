import React, { useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  PatchNotes: {},
}))

export const PatchNotesTab: React.FC = () => {
  const cl = useStyles()
  return (
    <div>
      <Typography variant="h5">
        Patch Notes
      </Typography>
    </div>
  )
}