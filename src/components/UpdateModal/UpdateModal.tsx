import React from 'react'
import { Modal, makeStyles } from '@material-ui/core'

import { useAppContext } from 'context'

import { ProgressBar } from 'components/ProgressBar'

export const useStyles = makeStyles(theme => ({
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
  'Update Available': 'Downloading the latest update...',
  'Update Downloaded': 'Download complete. Restarting...',
  'No Updates': 'Up to date',
}

export const UpdateModal: React.FC<Props> = ({
  open,
}) => {
  const cl = useStyles()
  const { appUpdateState: updateState, appUpdateDownloadPercent: updateDownloadPercent } = useAppContext()
  const message = MESSAGES[updateState]
  const showProgressBar = updateState === 'Update Available' || updateState === 'Update Downloaded'
  return (
    <Modal open={open} className={cl.updateModal}>
      <div className={cl.content}>
        <p>{message}</p>
        {showProgressBar && (
          <ProgressBar progress={updateDownloadPercent} />
        )}
      </div>
    </Modal>
  )
}