import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default theme;
