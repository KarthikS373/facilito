import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    },
    fontFamily: "Orkney"
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "10px"
      },
      root: {
        borderRadius: "10px",
        fontFamily: "Orkney"
      }
    },
    MuiPickersModal: {
      dialogRootWider: {
        minWidth: "340px"
      }
    },
    // @ts-ignore
    MuiPickersBasePicker: {
      pickerView: {
        minWidth: "340px"
      }
    }
  },
  palette: {
    primary: {
      main: "#511F73"
    },
    info: {
      main: "#346898"
    }
  }
});
