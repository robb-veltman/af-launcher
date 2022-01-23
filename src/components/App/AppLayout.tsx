import React from 'react'
import { makeStyles } from '@material-ui/core'

import { MenuBar } from 'components/MenuBar'
import { Main, Download } from 'components/sections'

export const useStyles = makeStyles(theme => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 0, 2, 0),
    height: '100vh',
    backgroundColor: theme.palette.bg.main,
  },
  appTop: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(1, 2, 2, 2),
  },
  appBottom: {
    padding: theme.spacing(0, 2),
    width: '100%',
  }
}))

export const AppLayout: React.FC = () => {
  const cl = useStyles()
  return (
    <div className={cl.appWrapper}>
      <MenuBar />
      <main className={cl.appTop}>
        <Main />
      </main>
      <section className={cl.appBottom}>
        <Download />
      </section>
    </div>
  )
}