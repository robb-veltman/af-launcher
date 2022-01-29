import React from 'react'
import cx from 'classnames'
import { LinearProgress, LinearProgressProps, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
  },
}))

export type ProgressBarProps = LinearProgressProps

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  value,
  ...rest
}) => {
  const cl = useStyles()
  return (
    <LinearProgress
      className={cx(cl.progressBar, className)}
      variant="determinate"
      value={value}
      {...rest}
    />
  )
}