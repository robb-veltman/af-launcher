import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useGameContext } from 'context'
import { PlayButton } from './PlayButton'
import { GameProgressBar } from 'components/ProgressBar/GameProgressBar'

const useStyles = makeStyles(theme => ({
  download: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingBottom: theme.spacing(1),
  },
  progress: {
    fontFamily: 'Nove',
    fontSize: '28px',
    marginRight: theme.spacing(1),
    textShadow: '3px 3px black',
  },
  progressBar: {
    marginRight: theme.spacing(2),
  },
}))

type ProgressType = 'None' | 'Download' | 'Install' | 'Complete'

export const Download: React.FC = () => {
  const cl = useStyles()
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

  return (
    <div className={cl.download}>
      <Typography className={cl.progress} color="textPrimary">
        {Math.round(progress * 100)}%
      </Typography>
      <GameProgressBar value={progress * 100} className={cl.progressBar} />
      <PlayButton />
    </div>  
  )
}