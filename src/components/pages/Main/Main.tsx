import React, { useEffect } from 'react'

import { useStyles } from './style'
import { useAppContext } from 'context'

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState, version, installUpdate } = useAppContext()

  return (
    <div className={cl.main}>
      <p>Update State: {updateState}</p>
      <p>Version: {version}</p>
      <button
        onClick={installUpdate}
        disabled={updateState !== 'Update Downloaded'}
      >
        install update
      </button>
    </div>
  );
}