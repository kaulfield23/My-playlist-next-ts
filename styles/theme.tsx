import { createTheme } from "@mui/material/styles";
import { red, green, blueGrey, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: green.A700,
    },
    error: {
      main: red[600],
    },
    info: {
      main: blueGrey[800],
    },
  },
});
