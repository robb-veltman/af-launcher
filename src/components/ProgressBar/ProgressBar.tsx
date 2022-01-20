import React from 'react'
import cx from 'classnames'
import { LinearProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
  },
}))

interface Props {
  progress: number
  className?: string
}

export const ProgressBar: React.FC<Props> = ({
  progress,
  className,
}) => {
  const cl = useStyles()
  return (
    <LinearProgress
      className={cx(cl.progressBar, className)}
      variant="determinate"
      value={progress}
    />
  )
}