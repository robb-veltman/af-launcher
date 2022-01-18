import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React from 'react'

export const theme = createTheme({
  typography: {
    // fontFamily: ['Roboto', 'sans-serif'].join(', '),
  },
  palette: {
    text: {
      // primary: 'white',
      // secondary: ,
    },
  },
})

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
)