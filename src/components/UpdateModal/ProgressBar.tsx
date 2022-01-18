import React from 'react'
import { LinearProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
  },
}))

interface Props {
  progress: number
}

export const ProgressBar: React.FC<Props> = ({
  progress,
}) => {
  const cl = useStyles()
  return (
    <LinearProgress
      className={cl.progressBar}
      variant="determinate"
      value={progress}
    />
  )
}