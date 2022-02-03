import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { Button, Typography, makeStyles, IconButton } from '@material-ui/core'
import { useGameAPI } from 'hooks'
import { useGameContext } from 'context'
import { GameUpdateState } from 'context/game/types'

const useStyles = makeStyles(theme => ({
  playBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  playBtn: {
    fontFamily: 'Nove',
    fontSize: 32,
    textShadow: '4px 4px black',
    borderRadius: 0,
    width: 180,
    height: 60,
    boxShadow: '4px 4px black',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.light,
      boxShadow: '5px 5px black',
      transform: 'translate(-1px, -1px)',
    },
    '&:disabled': {
      textShadow: `4px 4px ${theme.palette.grey[900]}`,
      backgroundColor: '#49305D',
      color: '#BBBBBB',
    },
    '&.isPressed': {
      transform: 'scale(0.97, 0.97)',
    },
  },
  stateLabel: {
    width: '80%',
    textAlign: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'black',
    position: 'absolute',
    top: '-36px',
    fontFamily: 'InformaPro-Normal',
  },
  options: {
    display: 'flex',
    background: 'red',
    borderRadius: 0,
    width: '30px',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
}))

const LABELS: Record<GameUpdateState, string> = {
  'Loading': 'Loading...',
  'Checking': 'Checking...',
  'Downloading': 'Downloading...',
  'Installing': 'Installing...',
  'Up To Date': 'Ready to Play!'
}

export const PlayButton: React.FC = () => {
  const cl = useStyles()
  const gameApi = useGameAPI()
  const { updateState, installProgress } = useGameContext()
  const label = LABELS[updateState]
  const [isPressed, setIsPressed] = useState(false)

  // a temporary disabled state to prevent double-clicks
  const [isTempDisabled, setIsTempDisabled] = useState(false)

  const onClick = () => {
    if (!isTempDisabled)
    setIsTempDisabled(true)
    setTimeout(() => setIsTempDisabled(false), 2000)
    gameApi.startGame()
  }

  return (
    <div className={cl.playBtnContainer}>
      <Typography className={cl.stateLabel} variant="body2" color="textPrimary">
        {label}
      </Typography>
      <Button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={onClick}
        disabled={updateState !== 'Up To Date' || installProgress < 1 || isTempDisabled}
        className={cx(cl.playBtn, { isPressed })}
        variant="contained"
        color="primary"
        disableRipple
        disableElevation
      >
        PLAY
      </Button>
    </div>
  )
}