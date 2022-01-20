import React from 'react'

import { AppContextProvider } from 'context'

import { ThemeProvider } from 'components/Theme'

import { AppLayout } from './AppLayout'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <AppLayout />
      </AppContextProvider>
    </ThemeProvider>
  )
}
