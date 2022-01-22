import React from 'react'
import Icon from '@mdi/react'
import {
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowRestore,
  mdiWindowClose,
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
      path={mdiWindowClose}
      color="white"
      size={0.8}
    />
  )
}
