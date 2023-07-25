// import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';



// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(37,99,235,1) !important',
    },
    secondary: {
      main: 'rgb(75,85,99)',
      contrastText: "#fff"
    }
  },
});

export default theme;