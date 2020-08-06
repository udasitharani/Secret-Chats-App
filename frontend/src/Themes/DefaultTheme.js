import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[600],
    },
    secondary: {
      main: pink[400],
    },
  },
});

export default theme;
