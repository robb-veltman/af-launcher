import { createTheme, MuiThemeProvider } from '@material-ui/core'
import React from 'react'

import '@material-ui/core/styles'

interface BgPalette {
  bright: string
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    bg: Palette['primary'] & BgPalette
  }
  interface PaletteOptions {
    bg: PaletteOptions['primary'] & BgPalette
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Gilmer-Regular', 'sans-serif'].join(', '),
  },
  palette: {
    bg: {
      main: '#212121',
      dark: '#000000',
      light: '#303030',
      bright: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#9E97F7',
    },
  },
})

// export const theme = createTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       main: 'rgba(0, 255, 0, 1)',
//     }
//   },
// })

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
)