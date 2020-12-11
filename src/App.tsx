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
import { API, graphqlOperation } from "aws-amplify";
import { GetStudentUserQuery } from "./API";
import { getStudentUser } from "./graphql/queries";
import { createStudentUser } from "./graphql/mutations";

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
import allvar from "./images/allvar.svg";

import on from "./images/OnTheLines.svg";
import ledger from "./images/ledger.svg";
import highledger from "./images/highledger.svg";

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any | undefined>();
  const [levelNum, setLevelNum] = React.useState<number>(0);

  const [selectedLevel, setSelectedLevel] = React.useState<
    Array<string> | undefined
  >();
  const [score, setScore] = useState(0);

  React.useEffect(() => {
    fetchScore();

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, [user, selectedLevel]);

  async function fetchScore() {
    try {
      if (user !== undefined) {
        const studentUserData: any = await API.graphql({
          query: getStudentUser,
          variables: { id: user.attributes.sub },
        });
        setScore(studentUserData.data.getStudentUser.score);
      }
    } catch (err) {
      console.log("error fetching score, creating score");
      if (user.attributes !== undefined) {
        const studentUserData = {
          id: user.attributes.sub,
          score: 0,
          teacherName: user.attributes['custom:teacher']
        };

        try {
          await API.graphql({
            query: createStudentUser,
            variables: { input: studentUserData },
          });
        } catch {
          console.log("error creating score");
        }
      }
    }
  }

  function setLevels(array: Array<string>, levelNum: number) {
    setSelectedLevel(array);
    setLevelNum(levelNum);
    console.log(user);
  }
  const classes = useStyles();

  return authState === AuthState.SignedIn && user ? (
    <ThemeProvider>
      {!selectedLevel ? (
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {user.username}: {score}
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <AmplifySignOut />
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
            levelNum={levelNum}
            user={user}
            globalScore={score}
          />
        ) : (
          <>
            <div className={classes.mobileContainer}>
              <div className={classes.mobileRow}>
                <img
                  width="80px"
                  height="80px"
                  src={between}
                  onClick={() => setLevels(["f/4", "a/4", "c/5", "e/5"], 1)}
                />
                <img
                  width="80px"
                  height="80px"
                  src={on}
                  onClick={() =>
                    setLevels(["e/4", "g/4", "b/4", "d/5", "f/5"], 2)
                  }
                />
              </div>
              <div className={classes.mobileRow}>
                <img
                  width="80px"
                  height="80px"
                  src={ledger}
                  onClick={() =>
                    setLevels(["b/3", "g/3", "a/3", "c/4", "d/4"], 3)
                  }
                />
                <img
                  width="80px"
                  height="80px"
                  src={all}
                  onClick={() =>
                    setLevels(
                      ["a/4", "c/5", "e/4", "g/4", "b/4", "d/5", "f/5"],
                      4
                    )
                  }
                />
              </div>
              <div className={classes.mobileRow}>
                <img
                  width="80px"
                  height="80px"
                  src={allvar}
                  onClick={() =>
                    setLevels(["a/5", "c/4", "g/3", "d/4", "f/5"], 5)
                  }
                />
                <img
                  width="80px"
                  height="80px"
                  src={highledger}
                  onClick={() => setLevels(["g/5", "a/5", "b/5", "f/5"], 6)}
                />
              </div>
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
              type: "custom:teacher",
              label: "Teachers's name",
              placeholder: "",
              required: true,
            },
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
    mobileContainer: {
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
    },
    mobileRow: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "2em",
    },
  })
);

export default AuthStateApp;
