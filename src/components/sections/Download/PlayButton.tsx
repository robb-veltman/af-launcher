import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'
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
      backgroundColor: theme.palette.primary.light,
      boxShadow: '5px 5px black',
      transform: 'translate(-1px, -1px)',
    },
    '&:disabled': {
      backgroundColor: 'gray',
      textShadow: 'none',
    },
  },
  stateLabel: {
    width: '80%',
    textAlign: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'black',
    position: 'absolute',
    top: '-36px',
  },
}))

const LABELS: Record<GameUpdateState, string> = {
  'Loading': 'Loading...',
  'Checking': 'Checking for Update',
  'Downloading': 'Downloading Update',
  'Installing': 'Installing Update',
  'Up To Date': 'Ready to Play!'
}

export const PlayButton: React.FC = () => {
  const cl = useStyles()
  const gameApi = useGameAPI()
  const { updateState, installProgress } = useGameContext()
  const label = LABELS[updateState]
  return (
    <div className={cl.playBtnContainer}>
      <Typography className={cl.stateLabel} variant="body2" color="textPrimary">
        {label}
      </Typography>
      <Button
        // disabled={updateState !== 'Up To Date' || installProgress < 1}
        onClick={gameApi.startGame}
        className={cl.playBtn}
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