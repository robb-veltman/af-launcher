import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

import { MainTabs } from './Tabs'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '68vw',
    marginLeft: '5vw',
  },
  title: {
    zIndex: 1,
    fontFamily: 'Nove',
    fontSize: '80px',
    marginBottom: '-15px',
    marginLeft: '-24px',
    textShadow: '5px 5px black',
  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  return (
    <div className={cl.main}>
      <Typography variant="h1" color="textPrimary" className={cl.title}>
        AFTERSTRIFE
      </Typography>
      <MainTabs />
    </div>
  );
}