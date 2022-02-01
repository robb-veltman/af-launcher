import React from 'react'
import Icon from '@mdi/react'
import { Settings } from '@material-ui/icons'
import {
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowRestore,
  mdiCloseThick,
  mdiCog,
} from '@mdi/js'

export const ICONS = {
  minimize: (
    <Icon
      path={mdiWindowMinimize}
      color="white"
      size={0.8}
    />
  ),
  maximize: (
    <Icon
      path={mdiWindowMaximize}
      color="white"
      size={0.8}
    />
  ),
  maximizeRestore: (
    <Icon
      path={mdiWindowRestore}
      color="white"
      size={0.8}
    />
  ),
  close: (
    <Icon
      path={mdiCloseThick}
      color="white"
      size={0.8}
    />
  ),
  settings: (
    <Icon
      path={mdiCog}
      color="white"
      size={0.8}
    />
  ),
}
