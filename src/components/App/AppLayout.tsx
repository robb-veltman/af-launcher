import React from 'react'
import { makeStyles } from '@material-ui/core'

import { MenuBar } from 'components/MenuBar'
import { Main, Download } from 'components/sections'

//@ts-ignore
import bgSource from 'assets/images/bg.png'

export const useStyles = makeStyles(theme => ({
  appWrapper: {
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${bgSource})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: `' '`,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(42,14,57,0.25) 100%)',
    }
  },
  appTop: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(0, 2, 0, 2),
    zIndex: 1,
  },
  appBottom: {
    width: '100%',
    padding: theme.spacing(0, 2),
    zIndex: 1,
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