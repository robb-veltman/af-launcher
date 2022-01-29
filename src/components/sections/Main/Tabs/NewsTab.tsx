import React, { useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { useAppContext, useGameContext } from 'context'

const useStyles = makeStyles(theme => ({
  news: {

  },
  header: {
    fontFamily: 'Nove',
    marginBottom: theme.spacing(1),
  },
}))

export const NewsTab: React.FC = () => {
  const cl = useStyles()
  const { updateState: appUpdateState, version: appVersion } = useAppContext()
  const { updateState: gameUpdateState, metadata, reinstallGame } = useGameContext()
  return (
    <div className={cl.news}>
      <Typography variant="h5" color="textPrimary" className={cl.header}>
        Launcher Info
      </Typography>
      <Typography variant="body1" color="textPrimary">
        State: {appUpdateState}
        <br />
        Version: {appVersion}
        <br />
        Environment: {process.env.NODE_ENV}
      </Typography>
      <br />
      <Typography variant="h5" color="textPrimary" className={cl.header}>
        Game Info
      </Typography>
      <Typography variant="body1" color="textPrimary">
        {metadata?.name}
        <br />
        State: {gameUpdateState}
        <br />
        Version: {metadata?.version}
        <br />
        © {metadata?.company} 2022
      </Typography>
    </div>
  )
}