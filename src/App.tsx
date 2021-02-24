import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Container,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { ThemeProvider } from "./ThemeProvider";
import { API } from "aws-amplify";
import { getStudentUser } from "./graphql/queries";
import { createStudentUser } from "./graphql/mutations";
import "./app.scss";
import { ScoreIcon } from "./icons/scoreIcon";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";

import NotificationsIcon from "@material-ui/icons/Notifications";
import NoteReaderLevel from "./home/NoteReaderLevel";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "./logo.png";
import between from "./images/BetweenLines.svg";
import all from "./images/AllTheLines.svg";
import allvar from "./images/allvar.svg";

import on from "./images/OnTheLines.svg";
import ledger from "./images/ledger.svg";
import highledger from "./images/highledger.svg";

import spaces from "./images/home/Spaces.png";
import lines from "./images/home/Lines.png";
import mixed1 from "./images/home/Mixed1.png";
import ledger1 from "./images/home/Ledger 1.png";
import ledger2 from "./images/home/Ledger 2.png";
import mixed2 from "./images/home/Mixed 2.png";

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any | undefined>();
  const [levelNum, setLevelNum] = React.useState<number>(0);

  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const prevOpen = React.useRef(openMenu);
  const [selectedLevel, setSelectedLevel] = React.useState<
    Array<string> | undefined
  >();
  const [score, setScore] = useState(0);

  React.useEffect(() => {
    if (
      prevOpen.current === true &&
      openMenu === false &&
      anchorRef.current != null
    ) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const openLevel = (level: any, levelNum: number) => {
    setSelectedLevel(level);
    setLevelNum(levelNum);
    setOpenMenu(false);
  };

  React.useEffect(() => {
    fetchScore();
    setOpenMenu(false);

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
      if (
        user.attributes !== undefined &&
        user.attributes["custom:teacher"] !== undefined
      ) {
        const studentUserData = {
          id: user.attributes.sub,
          score: 0,
          teacherName: user.attributes["custom:teacher"],
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

  return authState === AuthState.SignedIn && user ? (
    <ThemeProvider>
      {!selectedLevel ? (
        <AppBar position="relative">
          <Toolbar>
            <ScoreIcon />
            <Typography
              color="textPrimary"
              style={{ paddingLeft: "15px" }}
              variant="h6"
              className="score"
            >
              {score}
            </Typography>
            <IconButton edge="end" color="default" aria-label="menu">
              <NotificationsIcon></NotificationsIcon>
            </IconButton>
            <IconButton
              edge="end"
              color="default"
              aria-label="menu"
              ref={anchorRef}
              aria-controls={openMenu ? "menu-list" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
            <Popper
              open={openMenu}
              role={undefined}
              anchorEl={anchorRef.current}
              placement="bottom-end"
              disablePortal
              keepMounted
              style={{ width: "256px" }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList variant="menu" id="menu-list" disablePadding>
                    <MenuItem
                      divider
                      button={false}
                      selected={false}
                      classes={{
                        root: "account-name-menu-item menu-item",
                      }}
                    >
                      {user.username}
                      <AccountCircleIcon></AccountCircleIcon>
                    </MenuItem>
                    <MenuItem
                      align-items="center"
                      classes={{
                        root: "menu-item",
                      }}
                      onClick={async () => {
                        await Auth.signOut();
                      }}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
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
            <div className="section-header">
              <h4 className="section-title">Treble Clef</h4>
              <img
                className="section-img"
                src={on}
                height="40px"
                width="40px"
              ></img>
            </div>
            <div className="levels-container">
              <div className="levels-row">
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() => {
                      openLevel(["f/4", "a/4", "c/5", "e/5"], 1);
                    }}
                  >
                    <img style={{ padding: "0" }} src={spaces}></img>
                  </Button>
                  <h4 className="section-title">Spaces</h4>
                </div>
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() =>
                      openLevel(["e/4", "g/4", "b/4", "d/5", "f/5"], 2)
                    }
                  >
                    <img style={{ padding: "0" }} src={lines}></img>
                  </Button>
                  <h4 className="section-title">Lines</h4>
                </div>
              </div>
              <div className="levels-row">
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() =>
                      openLevel(
                        ["a/4", "c/5", "e/4", "g/4", "b/4", "d/5", "f/5"],
                        4
                      )
                    }
                  >
                    <img style={{ padding: "0" }} src={mixed1}></img>
                  </Button>
                  <h4 className="section-title">Mixed 1</h4>
                </div>
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() =>
                      openLevel(["b/3", "g/3", "a/3", "c/4", "d/4"], 3)
                    }
                  >
                    <img style={{ padding: "0" }} src={ledger1}></img>
                  </Button>
                  <h4 className="section-title">Ledger 1</h4>
                </div>
              </div>
              <div className="levels-row">
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() => openLevel(["g/5", "a/5", "b/5", "f/5"], 6)}
                  >
                    <img style={{ padding: "0" }} src={ledger2}></img>
                  </Button>
                  <h4 className="section-title">Ledger 2</h4>
                </div>
                <div className="button-and-title-container">
                  <Button
                    className="answer-button"
                    onClick={() =>
                      openLevel(["a/5", "c/4", "g/3", "d/4", "f/5"], 5)
                    }
                  >
                    <img style={{ padding: "0" }} src={mixed2}></img>
                  </Button>
                  <h4 className="section-title">Mixed 2</h4>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </ThemeProvider>
  ) : (
    <div className="sign-up-container">
      <div>
        <img src={logo} height="72px" width="307px"></img>
      </div>
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

export default AuthStateApp;
