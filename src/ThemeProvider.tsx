import React from "react";
import {
  ThemeProvider as MaterialUiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#EBB316",
      contrastText: "#fff",
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaterialUiThemeProvider theme={theme}>{children}</MaterialUiThemeProvider>
  );
};
