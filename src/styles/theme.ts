import { blue, red } from '@material-ui/core/colors'
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

// Creates a theme
// For more info see https://material-ui.com/customization/theming/
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#78b7cb',
      },
      secondary: {
        main: blue[700],
      },
      error: {
        main: red[300],
      },
      background: {
        default: '#254e65',
        paper: '#152d45',
      },
      text: {
        primary: '#3a7fb7',
        secondary: '#254c6f',
      },
    },
    overrides: {
      MuiInput: {
        root: {
          backgroundColor: '#3a4651',
          borderRadius: '10px',
        },
        input: {
          margin: '10px',
        },
      },
      MuiPaper: {
        root: {
          border: '1px solid #284359',
        },
      },
    },
  })
)
export default theme
