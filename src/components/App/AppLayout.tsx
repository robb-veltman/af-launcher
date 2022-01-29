import React from 'react'
import { makeStyles } from '@material-ui/core'

import { MenuBar } from 'components/MenuBar'
import { Main, Download } from 'components/sections'

//@ts-ignore
import bgSource from 'assets/images/bg.png'

export const useStyles = makeStyles(theme => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${bgSource})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  appTop: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(0, 2, 0, 2),
  },
  appBottom: {
    width: '100%',
    padding: theme.spacing(0, 2),
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