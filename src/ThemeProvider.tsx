import React from "react";
import {
  ThemeProvider as MaterialUiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#798DFA",
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaterialUiThemeProvider theme={theme}>{children}</MaterialUiThemeProvider>
  );
};
