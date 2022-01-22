import React from 'react'
import cx from 'classnames'
import { LinearProgress, LinearProgressProps, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
  },
}))

interface Props extends LinearProgressProps {
  
}

export const ProgressBar: React.FC<Props> = ({
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