import React from 'react'
import { Modal, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useAppContext } from 'context'

import { ProgressBar } from './ProgressBar'

export const useStyles = makeStyles((theme: Theme) => ({
  updateModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    background: 'white',
    outline: 'none',
    userSelect: 'none',
    padding: theme.spacing(5),
    width: '50vw',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

interface Props {
  open: boolean
}

const MESSAGES = {
  'Checking': 'Checking for updates...',
  'Update Available': 'An update to the launcher is available. It will now download automatically.',
  'Update Downloaded': 'Update download complete. Restarting...',
  'No Updates': 'You are up to date',
}

export const UpdateModal: React.FC<Props> = ({
  open,
}) => {
  const cl = useStyles()
  const { updateState, updateDownloadPercent } = useAppContext()
  const message = MESSAGES[updateState]
  return (
    <Modal open={open} className={cl.updateModal}>
      <div className={cl.content}>
        <p>{message}</p>
        {updateState === 'Update Available' && (
          <ProgressBar progress={updateDownloadPercent} />
        )}
      </div>
    </Modal>
  )
}