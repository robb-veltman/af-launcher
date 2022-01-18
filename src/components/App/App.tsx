import React from 'react'

import { AppContextProvider } from 'context'

import { Main } from 'components/pages'
import { ThemeProvider } from 'components/Theme'

import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => ({
  app: {

  },
}))
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
