import React from 'react'
import cx from 'classnames'
import { makeStyles, darken } from '@material-ui/core'

import { ProgressBar, ProgressBarProps } from './ProgressBar'

const useStyles = makeStyles(theme => ({
  bar: {
    border: `2px solid ${theme.palette.primary.dark}`,
    backgroundColor: darken(theme.palette.secondary.main, 0.6),
    height: 15,
    marginRight: theme.spacing(2),
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.secondary.main,
      // background: `linear-gradient(90deg, rgba(245,199,122,1) 0%, rgba(251,240,220,1) 100%)`,
    },
  },
}))

type GameProgressBarProps = ProgressBarProps

export const GameProgressBar: React.FC<GameProgressBarProps> = ({
  className,
  value,
  ...rest
}) => {
  const cl = useStyles()
  return (
    <ProgressBar
      className={cx(cl.bar, className)}
      value={value}
      {...rest}
    />
  )
}