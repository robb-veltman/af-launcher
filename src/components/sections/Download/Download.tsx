import React, { useEffect, useState } from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { ProgressBar } from 'components/ProgressBar'
import { useGameContext } from 'context'
import { useGameAPI } from 'hooks'
import { GameUpdateState } from 'context/game/types'

const useStyles = makeStyles(theme => ({
  download: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  progress: {
    fontFamily: 'Nove',
    fontSize: '28px',
    marginRight: theme.spacing(1),
  },
  progressBar: {
    height: 15,
    marginRight: theme.spacing(2),
  },
  playBtn: {
    marginRight: theme.spacing(4),
  },
}))

const LABELS: Record<GameUpdateState, string> = {
  'Loading': 'Loading...',
  'Checking': 'Checking for update',
  'Downloading': 'Downloading update',
  'Installing': 'Installing update',
  'Up To Date': 'Ready to play'
}

type ProgressType = 'None' | 'Download' | 'Install' | 'Complete'

export const Download: React.FC = () => {
  const cl = useStyles()
  const gameAPI = useGameAPI()
  const { downloadProgress, installProgress, updateState } = useGameContext()
  const [progressType, setProgressType] = useState<ProgressType>('None')
  useEffect(() => {
    if (updateState === 'Downloading') {
      setProgressType('Download')
    } else if (updateState === 'Installing') {
      setProgressType('None')
      setTimeout(() => {
        setProgressType('Install')
      }, 250)
    } else if (updateState === 'Up To Date') {
      setProgressType('Complete')
    }
  }, [updateState])
  const progress = {
    None: 0,
    Download: downloadProgress,
    Install: installProgress,
    Complete: 1,
  }[progressType]
  
  let label = LABELS[updateState]
  if (progressType === 'Download' || progressType === 'Install') {
    label += ` ${Math.round(progress * 100)}%`
  }

  const onClickPlay = () => {
    gameAPI.startGame()
  }

  return (
    <div className={cl.download}>
      <Typography className={cl.progress} color="textPrimary">
        {Math.round(progress * 100)}%
      </Typography>
      <ProgressBar value={progress * 100} className={cl.progressBar} />
      {/* <Typography variant="body1" color="textPrimary">
        {label}
      </Typography> */}
      <Button
        disableElevation
        size="large"
        variant="contained"
        className={cl.playBtn}
        disabled={updateState !== 'Up To Date' || installProgress < 1}
        onClick={onClickPlay}
      >
        PLAY
      </Button>
    </div>  
  )
}