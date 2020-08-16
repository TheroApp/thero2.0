import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Container, Typography, Toolbar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Thero
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="teacher mode">
            <SupervisorAccountIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{}</Container>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default App;
