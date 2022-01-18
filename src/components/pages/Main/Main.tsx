import React, { useEffect } from 'react'

import { useStyles } from './style'
import { useAppUpdateContext } from 'context'

export const Main: React.FC = () => {
  const cl = useStyles()
  const { updateState } = useAppUpdateContext()

  return (
    <div className={cl.main}>
      <p>{updateState}</p>
    </div>
  );
}