import React, { useState } from 'react'
import cx from 'classnames'
import { IconButton, makeStyles } from '@material-ui/core'
import { useAppAPI } from 'hooks'

import { ICONS } from './icons'

const useStyles = makeStyles(theme => ({
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  draggable: {
    '-webkit-app-region': 'drag',
    flexGrow: 1,
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  btn: {
    borderRadius: 0,
    padding: theme.spacing(0.5, 1),
    color: 'white',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      '&.close': {
        background: 'red',
      },
    },
  },
  btnIcon: {
    fontSize: 20,
  },
}))

export const MenuBar: React.FC = () => {
  const cl = useStyles()
  const { minimize, maximize, close } = useAppAPI()
  const [isMaximized, setIsMaximized] = useState(false)
  const onClickMaximize = () => {
    setIsMaximized(!isMaximized)
    maximize()
  }
  return (
    <section className={cl.menuBar}>
      <div className={cl.draggable} />
      <div className={cl.buttons}>
        <IconButton className={cl.btn} disableRipple onClick={minimize}>
          {ICONS.minimize}
        </IconButton>
        {/* <IconButton className={cl.btn} disableRipple onClick={onClickMaximize}>
          {isMaximized ? ICONS.maximizeRestore : ICONS.maximize }
        </IconButton> */}
        <IconButton className={cx(cl.btn, 'close')} disableRipple onClick={close}>
          {ICONS.close}
        </IconButton>
      </div>
    </section>
  )
}