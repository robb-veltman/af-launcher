import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { ProgressBar } from 'components/ProgressBar'
import { useGameContext } from 'context'
import { useGameAPI } from 'hooks'
import { GameUpdateState } from 'context/game/types'

const useStyles = makeStyles(theme => ({
  download: {
    padding: theme.spacing(2),
  },
  playBtn: {
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    height: 25,
  },
}))

const LABELS: Record<GameUpdateState, string> = {
  'Loading': 'Loading...',
  'Checking': 'Checking for update',
  'Downloading': 'Downloading update',
  'Installing': 'Installing update',
  'Up To Date': 'Ready to play'
}

export const Download: React.FC = () => {
  const cl = useStyles()
  const gameAPI = useGameAPI()
  const { downloadProgress, installProgress, updateState } = useGameContext()
  const progress = Math.max(downloadProgress, installProgress) * 100
  const label = LABELS[updateState]

  const onClickPlay = () => {
    gameAPI.startGame()
  }
  return (
    <div className={cl.download}>
      <Button
        size="large"
        variant="contained"
        className={cl.playBtn}
        disabled={updateState !== 'Up To Date' || installProgress < 1}
        onClick={onClickPlay}
      >
        PLAY
      </Button>
      <ProgressBar value={0.5} className={cl.progressBar} />
      <Typography variant="body1" color="textPrimary">
        {label}
      </Typography>
    </div>  
  )
}