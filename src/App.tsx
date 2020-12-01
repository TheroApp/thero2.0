import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Container,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { ThemeProvider } from "./ThemeProvider";
import { API, graphqlOperation, loadingOverlay } from "aws-amplify";
import { GetTaskQuery } from "./API";
import { listTasks } from "./graphql/queries";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifyS3Image,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import NoteReaderLevel from "./home/NoteReaderLevel";

import logo from "./logo.png";
import between from "./images/BetweenLines.svg";
import all from "./images/AllTheLines.svg";
import on from "./images/OnTheLines.svg";

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();
  const [selectedLevel, setSelectedLevel] = React.useState<
    Array<string> | undefined
  >();

  React.useEffect(() => {
    fetchTasks();

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const taskData: any = await API.graphql(graphqlOperation(listTasks));
      const tasks = taskData.data.listTasks.items;
      setTasks(tasks);
    } catch (err) {
      console.log("error fetching tasks");
    }
  }

  const classes = useStyles();

  return authState === AuthState.SignedIn && user ? (
    <ThemeProvider>
      {!selectedLevel ? (
        <AppBar position="relative">
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
      ) : (
        <></>
      )}
      <Container maxWidth="sm">
        {selectedLevel ? (
          <NoteReaderLevel
            practicePool={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        ) : (
          <>
            <div
              style={{
                paddingTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                width="80px"
                height="80px"
                src={between}
                onClick={() => setSelectedLevel(["f/4", "a/4", "c/5", "e/5"])}
              />
              <img
                width="80px"
                height="80px"
                src={on}
                onClick={() =>
                  setSelectedLevel(["e/4", "g/4", "b/4", "d/5", "f/5"])
                }
              />
              <img
                width="80px"
                height="80px"
                src={all}
                onClick={() => setSelectedLevel(["a/4", "c/5", "e/4", "g/4", "b/4", "d/5", "f/5"])}
              />
            </div>
          </>
        )}
      </Container>
    </ThemeProvider>
  ) : (
    <div className="sign-up-container">
      <img src={logo} height="100px" width="300px"></img>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          headerText="Sign up to Thero"
          haveAccountText="Already signed up?"
          formFields={[
            {
              type: "username",
              label: "Username",
              placeholder: "",
              hint: "Usernames are case sensitive",
              required: true,
            },
            { type: "email", label: "Email", placeholder: "", required: true },
            {
              type: "password",
              label: "Password",
              placeholder: "",
              required: true,
            },
          ]}
        ></AmplifySignUp>
        <AmplifySignIn
          slot="sign-in"
          headerText=""
          formFields={[
            {
              type: "username",
              label: "Username",
              placeholder: "",
              hint: "Usernames are case sensitive",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "",
              required: true,
            },
          ]}
        ></AmplifySignIn>
      </AmplifyAuthenticator>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default AuthStateApp;
