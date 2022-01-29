import React, { useState } from 'react'
import cx from 'classnames'
import { IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import { useAppAPI } from 'hooks'

import { ICONS } from './icons'
import { useGameContext } from 'context'

const useStyles = makeStyles(theme => ({
  menuBar: {
    zIndex: 1,
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
  settingsMenuList: {
    // padding: '0',
  },
  settingsMenuPaper: {
    background: theme.palette.primary.dark,
    borderRadius: 5,
    minWidth: '120px',
    zIndex: -1,
  },
  settingsMenuItem: {
    '&:hover': {
      background: theme.palette.primary.dark,
      filter: 'brightness(1.2)',
    },
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
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLButtonElement | null>(null)
  const onClickSettings = (e: React.MouseEvent<HTMLButtonElement>) =>
    setSettingsAnchorEl(e.currentTarget)
  const onSettingsMenuClose = () => setSettingsAnchorEl(null)
  const { reinstallGame, updateState } = useGameContext()
  const onClickReinstall = () => {
    onSettingsMenuClose()
    reinstallGame()
  }

  return (
    <section className={cl.menuBar}>
      <div className={cl.draggable} />
      <div className={cl.buttons}>
        <IconButton className={cl.btn} disableRipple onClick={minimize}>
          {ICONS.minimize}
        </IconButton>
        <IconButton className={cl.btn} disableRipple onClick={onClickSettings}>
          {ICONS.settings}
        </IconButton>
        <Menu
          anchorEl={settingsAnchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          classes={{ paper: cl.settingsMenuPaper, list: cl.settingsMenuList }}
          getContentAnchorEl={null}
          onClose={onSettingsMenuClose}
          open={!!settingsAnchorEl}
        >
          <MenuItem
            className={cl.settingsMenuItem}
            onClick={onClickReinstall}
            disableRipple
            disabled={updateState !== 'Up To Date'}
          >
            <Typography variant="body1">
              Reinstall
            </Typography>
          </MenuItem>
        </Menu>
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