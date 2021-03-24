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
import ProgressBar from "./components/progressBar";
import on from "./images/OnTheLines.svg";
import ledger from "./images/ledger.svg";
import highledger from "./images/highledger.svg";

import spaces from "./images/home/Spaces.png";
import lines from "./images/home/Lines.png";
import mixed1 from "./images/home/Mixed 1.png";
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
  const [goalLevels, setGoalLevels] = useState<Array<number>>([]);
  const [repeats, setRepeats] = useState();

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
    fetchUserDetails();
    setOpenMenu(false);

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, [user, selectedLevel]);

  async function fetchUserDetails() {
    try {
      if (user !== undefined) {
        const studentUserData: any = await API.graphql({
          query: getStudentUser,
          variables: { id: user.attributes.sub },
        });
        setScore(studentUserData.data.getStudentUser.score);
        setGoalLevels(studentUserData.data.getStudentUser.goalLevels);
      }
    } catch (err) {
      console.log("error fetching user data, creating new user");
      if (
        user.attributes !== undefined &&
        user.attributes["custom:teacher"] !== undefined
      ) {
        const studentUserData = {
          id: user.attributes.sub,
          score: 0,
          teacherName: user.attributes["custom:teacher"],
          userName: user.username,
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
      <Container maxWidth="sm" style={{ paddingBottom: "3em" }}>
        {selectedLevel ? (
          <NoteReaderLevel
            showFingerPosition={levelNum > 6 ? true : false}
            practicePool={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            levelNum={levelNum}
            user={user}
            globalScore={score}
          />
        ) : (
          <>
            {goalLevels.length === 0 ||
            goalLevels.some((r) => [1, 2, 3, 4, 5, 6].includes(r)) ? (
              <div className="section-header">
                <h4 className="section-title">Treble Clef</h4>
                <img
                  className="section-img"
                  src={on}
                  height="40px"
                  width="40px"
                ></img>
              </div>
            ) : (
              <></>
            )}

            <div className="levels-container">
              <div className="levels-row">
                {goalLevels.length === 0 || goalLevels.includes(1) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() => {
                        openLevel(["f/4", "a/4", "c/5", "e/5"], 1);
                      }}
                    >
                      <img className="home-level-image" src={spaces}></img>
                    </Button>
                    {goalLevels.includes(1) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}

                    <h4 className="section-title">Spaces</h4>
                  </div>
                ) : (
                  <> </>
                )}
                {goalLevels.length === 0 || goalLevels.includes(2) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() =>
                        openLevel(["e/4", "g/4", "b/4", "d/5", "f/5"], 2)
                      }
                    >
                      <img className="home-level-image" src={lines}></img>
                    </Button>
                    {goalLevels.includes(2) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">Lines</h4>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
              <div className="levels-row">
                {goalLevels.length === 0 || goalLevels.includes(4) ? (
                  <div className="button-and-title-container">
                    <Button
                      className=""
                      onClick={() =>
                        openLevel(
                          ["a/4", "c/5", "e/4", "g/4", "b/4", "d/5", "f/5"],
                          4
                        )
                      }
                    >
                      <img className="home-level-image" src={mixed1}></img>
                    </Button>
                    {goalLevels.includes(4) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">Mixed 1</h4>
                  </div>
                ) : (
                  <> </>
                )}
                {goalLevels.length === 0 || goalLevels.includes(3) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() =>
                        openLevel(["b/3", "g/3", "a/3", "c/4", "d/4"], 3)
                      }
                    >
                      <img className="home-level-image" src={ledger1}></img>
                    </Button>
                    {goalLevels.includes(3) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">Ledger 1</h4>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
              <div className="levels-row">
                {goalLevels.length === 0 || goalLevels.includes(6) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() => openLevel(["g/5", "a/5", "b/5", "f/5"], 6)}
                    >
                      <img className="home-level-image" src={ledger2}></img>
                    </Button>
                    {goalLevels.includes(6) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">Ledger 2</h4>
                  </div>
                ) : (
                  <> </>
                )}
                {goalLevels.length === 0 || goalLevels.includes(5) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() =>
                        openLevel(["a/5", "c/4", "g/3", "d/4", "f/5"], 5)
                      }
                    >
                      <img className="home-level-image" src={mixed2}></img>
                    </Button>
                    {goalLevels.includes(5) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">Mixed 2</h4>
                  </div>
                ) : (
                  <> </>
                )}
              </div>
            </div>
            {goalLevels.length === 0 ||
            goalLevels.some((r) => [7, 8].includes(r)) ? (
              <div className="section-header">
                <h4 className="section-title">Violin Fingering</h4>
                <img
                  className="section-img"
                  src={allvar}
                  height="40px"
                  width="40px"
                ></img>
              </div>
            ) : (
              <> </>
            )}
            <div className="levels-container">
              <div className="levels-row">
                {goalLevels.length === 0 || goalLevels.includes(7) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() =>
                        openLevel(
                          ["a/3", "b/3", "c/4", "d/4", "e/4", "f/4", "g/4"],
                          7
                        )
                      }
                    >
                      <img className="home-level-image" src={mixed2}></img>
                    </Button>
                    {goalLevels.includes(7) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">A Major 1</h4>
                  </div>
                ) : (
                  <></>
                )}
                {goalLevels.length === 0 || goalLevels.includes(8) ? (
                  <div className="button-and-title-container">
                    <Button
                      className="answer-button"
                      onClick={() =>
                        openLevel(
                          [
                            "a/4",
                            "b/4",
                            "c/5",
                            "d/5",
                            "e/5",
                            "f/5",
                            "g/5",
                            "a/5",
                          ],
                          8
                        )
                      }
                    >
                      <img className="home-level-image" src={mixed2}></img>
                    </Button>
                    {goalLevels.includes(8) ? (
                      <div style={{ width: "100px", paddingBottom: "1em" }}>
                        <ProgressBar completed={20}></ProgressBar>
                      </div>
                    ) : (
                      <> </>
                    )}
                    <h4 className="section-title">A Major 2</h4>
                  </div>
                ) : (
                  <></>
                )}
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
