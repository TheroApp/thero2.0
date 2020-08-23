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
import { API, graphqlOperation, loadingOverlay } from 'aws-amplify';
import { GetTaskQuery } from './API';
import { listTasks } from './graphql/queries';
import { AmplifyAuthenticator, AmplifyS3Image, AmplifySignIn, AmplifySignInButton, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Score } from "./Vexflow";

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(() => {
    fetchTasks()

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  const [tasks, setTasks] = useState([])

  async function fetchTasks() {
    try {
      const taskData: any = await API.graphql(graphqlOperation(listTasks))
      const tasks = taskData.data.listTasks.items;
      setTasks(tasks)
    } catch (err) { console.log('error fetching tasks') }
  }

  const classes = useStyles();

  const practicePool = ["a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5"];

  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const [currentNote, setCurrentNote] = useState(getRandomNoteFromNotePool);

  const checkNote = (selectedNote: string) => {
    if (selectedNote === currentNote) {
      setCurrentNote(getRandomNoteFromNotePool);
    }
  };

  return authState === AuthState.SignedIn && user ? (

    <ThemeProvider>
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
      <Container maxWidth="sm">{}
        <div style={{ paddingTop: '50px' }}>
          <h2>Amplify Tasks</h2>      {
            tasks.map((item: any, index) => (
              <div key={item.id ? item.id : index}>
                <p>{item.name}</p>
                <p>{item.description}</p>
              </div>
            ))
          }
        </div>
        <Score note="d/4" />
        <div className={classes.container}>
          <Button onClick={() => checkNote("a/4")}>A</Button>
          <Button onClick={() => checkNote("b/4")}>B</Button>
          <Button onClick={() => checkNote("c/5")}>C</Button>
          <Button onClick={() => checkNote("d/5")}>D</Button>
          <Button onClick={() => checkNote("e/5")}>E</Button>
          <Button onClick={() => checkNote("f/5")}>F</Button>
          <Button onClick={() => checkNote("g/5")}>G</Button>
        </div>
        <AmplifySignOut />
        <AmplifyS3Image imgKey={`Asset 2 1.png`} />
      </Container>
    </ThemeProvider>
  ) : (
      <>
        <AmplifyAuthenticator>
          <AmplifySignInButton provider='facebook'>
          </AmplifySignInButton>

          <AmplifySignUp
            slot="sign-up"
            formFields={[
              { type: "email" },
              { type: "password" }
            ]}
          />
        </AmplifyAuthenticator>
      </>
    );
}

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
