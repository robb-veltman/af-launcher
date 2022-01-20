import React from 'react'
import { makeStyles } from '@material-ui/core'

import { Main, Download } from 'components/sections'

export const useStyles = makeStyles(theme => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100vh',
    backgroundColor: theme.palette.bg.main,
  },
  appTop: {
    flexGrow: 3,
    background: theme.palette.bg.light,
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  appBottom: {
    background: theme.palette.bg.light,
    width: '100%',
    flexGrow: 1,
  }
}))

export const AppLayout: React.FC = () => {
  const cl = useStyles()
  return (
    <div className={cl.appWrapper}>
      <main className={cl.appTop}>
        <Main />
      </main>
      <section className={cl.appBottom}>
        <Download />
      </section>
    </div>
  )
}