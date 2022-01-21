import React from 'react'

import { AppContextProvider, GameContextProvider } from 'context'

import { ThemeProvider } from 'components/Theme'

import { AppLayout } from './AppLayout'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <GameContextProvider>
          <AppLayout />
        </GameContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  )
}
