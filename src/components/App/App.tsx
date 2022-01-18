import React from 'react'

import { AppUpdateContextProvider } from 'context'

import { Main } from 'components/pages'
import { useStyles } from './style'

const Providers: React.FC = ({ children }) => (
  <AppUpdateContextProvider>
    {children}
  </AppUpdateContextProvider>
)

export const App: React.FC = () => {
  const cl = useStyles()
  
  return (
    <Providers>
      <main className={cl.app}>
        <Main />
      </main>
    </Providers>
  );
}
