import React from 'react'

import { AppContextProvider } from 'context'

import { Main } from 'components/pages'
import { useStyles } from './style'
import { ThemeProvider } from 'components/Theme/Theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider>
    <AppContextProvider>
      {children}
    </AppContextProvider>
  </ThemeProvider>
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
