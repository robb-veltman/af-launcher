import { createTheme, MuiThemeProvider } from '@material-ui/core'
import React from 'react'

import '@material-ui/core/styles'

// interface BgPalette {
//   bright: string
// }

// declare module '@material-ui/core/styles/createPalette' {
//   interface Palette {
//     bg: Palette['primary'] & BgPalette
//   }
//   interface PaletteOptions {
//     bg: PaletteOptions['primary'] & BgPalette
//   }
// }

export const theme = createTheme({
  typography: {
    fontFamily: ['InformaPro-Normal', 'sans-serif'].join(', '),
  },
  palette: {
    primary: {
      light: '#DD7CFF',
      main: '#a91efe',
      dark: '#2a0e39',
    },
    secondary: {
      light: '#f5c77a',
      main: '#eedd1a',
      dark: '#827138',
    },
    // bg: {
    //   main: '#212121',
    //   dark: '#000000',
    //   light: '#303030',
    //   bright: '#424242',
    // },
    text: {
      primary: '#fff',
    },
  },
})

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
)