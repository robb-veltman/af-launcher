import React from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

import { useAppContext } from 'context'

export const useStyles = makeStyles((theme: Theme) => ({
  main: {

  },
}))

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState, version } = useAppContext()

  return (
    <div className={cl.main}>
      <p>hello</p>
      <p>Update State: {updateState}</p>
      <p>Version: {version}</p>
      <p>Env: {process.env.NODE_ENV}</p>
    </div>
  );
}