import React, { FunctionComponent, useEffect, useState } from "react";
import { Score } from "../Vexflow";
import {
  Container,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Icon,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";
import arrow from "../images/thin_big_right.png";
import done from "../images/done.svg";
import wrong from "../images/wrong.png";
import "../index.css";
import AppBar from "@material-ui/core/AppBar";
import { ArrowBack } from "@material-ui/icons";
import ProgressBar from "../components/progressBar";
import MediaQuery from "react-responsive";
import { createStudentHistory, updateStudentUser } from "../graphql/mutations";
import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

type NoteReaderLevelProp = {
  practicePool: Array<string>;
  setSelectedLevel: Function;
  user: any;
  globalScore: number;
  levelNum: number;
};

export const NoteReaderLevel = ({
  practicePool,
  setSelectedLevel,
  user,
  globalScore,
  levelNum
}: NoteReaderLevelProp) => {
  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const getFourOptions = (rightAnswer: string) => {
    var first = [rightAnswer];
    var note = practicePool[Math.floor(Math.random() * practicePool.length)];

    while (first.length < 4) {
      if (!first.includes(note)) {
        first.push(note);
      }
      note = practicePool[Math.floor(Math.random() * practicePool.length)];
    }

    //shuffle the array
    var i = first.length - 1;
    for (i; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = first[i];
      first[i] = first[j];
      first[j] = temp;
    }
    return first;
  };

  const [currentNote, setCurrentNote] = useState(getRandomNoteFromNotePool);
  const [selectedNote, setSelectedNote] = useState("");
  const [levelState, setLevelState] = useState("");
  const [fourOptions, setFourOptions] = useState(getFourOptions(currentNote));
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);

  const checkNote = (selectedNote: string) => {
    setTries(tries + 1);
    if (selectedNote === currentNote) {
      setScore(score + 1);
      setLevelState("Success");
      setSelectedNote("");
    } else {
      setLevelState("Fail");
      setSelectedNote("");
    }
    setTimeout(() => {
      getNewNote();
    }, 800);
  };

  const getNewNote = async () => {
    if (score == 1) {

      const calcScore = Math.round(100 - (tries - 10) * 10);
      const total = globalScore + calcScore;

      const studentUser = {
        id: user.attributes.sub,
        score: total,
      };
      try {
        const studentUserData: any = await API.graphql({
          query: updateStudentUser,
          variables: { input: studentUser },
        });
      } catch {
        console.log("Failed to update score");
      }
      const studentLevelData = {
        id: uuidv4(),
        level: levelNum,
        accuracy: calcScore,
        date: Date.now().toString(),
        username: user.username.toString(),
      };

      try {
        const response: any = await API.graphql({
          query: createStudentHistory,
          variables: { input: studentLevelData },
        });
        console.log(response);
      } catch {
        console.log("failed to create history");
      }

      setSelectedLevel("");
    }
    var randomNote = getRandomNoteFromNotePool();
    while (randomNote == currentNote) {
      randomNote = getRandomNoteFromNotePool();
    }
    setCurrentNote(randomNote);
    setFourOptions(getFourOptions(randomNote));

    setLevelState("");
  };

  const classes = useStyles();

  return (
    <div style={{ height: "70vh" }}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack
              onClick={() => {
                setSelectedLevel("");
              }}
            />
          </IconButton>
          <ProgressBar completed={score * 10}></ProgressBar>
        </Toolbar>
      </AppBar>
      <h3 className={classes.h3}>What is this note?</h3>
      <Score note={currentNote} />
      <MediaQuery minDeviceWidth={600}>
        <div className={classes.container}>
          {fourOptions.map((note) => {
            return (
              <Button
                disabled={levelState === "" ? false : true}
                key={note}
                className={
                  selectedNote === note
                    ? classes.selectedButton
                    : classes.button
                }
                onClick={() => {
                  setSelectedNote(note);
                }}
              >
                <h1>{note.charAt(0)}</h1>
              </Button>
            );
          })}
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className={classes.mobileContainer}>
          <div className={classes.mobileRow}>
            <button
              disabled={levelState === "" ? false : true}
              key={fourOptions[0]}
              className={
                selectedNote === fourOptions[0]
                  ? classes.selectedButton
                  : classes.button
              }
              onClick={() => {
                setSelectedNote(fourOptions[0]);
              }}
            >
              <h1>{fourOptions[0].charAt(0).toUpperCase()}</h1>
            </button>
            <button
              disabled={levelState === "" ? false : true}
              key={fourOptions[1]}
              className={
                selectedNote === fourOptions[1]
                  ? classes.selectedButton
                  : classes.button
              }
              onClick={() => {
                setSelectedNote(fourOptions[1]);
              }}
            >
              <h1>{fourOptions[1].charAt(0).toUpperCase()}</h1>
            </button>
          </div>
          <div className={classes.mobileRow}>
            <button
              disabled={levelState === "" ? false : true}
              key={fourOptions[2]}
              className={
                selectedNote === fourOptions[2]
                  ? classes.selectedButton
                  : classes.button
              }
              onClick={() => {
                setSelectedNote(fourOptions[2]);
              }}
            >
              <h1>{fourOptions[2].charAt(0).toUpperCase()}</h1>
            </button>
            <button
              disabled={levelState === "" ? false : true}
              key={fourOptions[3]}
              className={
                selectedNote === fourOptions[3]
                  ? classes.selectedButton
                  : classes.button
              }
              onClick={() => {
                setSelectedNote(fourOptions[3]);
              }}
            >
              <h1>{fourOptions[3].charAt(0).toUpperCase()}</h1>
            </button>
          </div>
        </div>
      </MediaQuery>
      <div className={classes.buttonContainer}>
        {selectedNote ? (
          <button
            className={classes.continueButton}
            onClick={() => {
              checkNote(selectedNote);
            }}
          >
            <div style={{ marginTop: "16px", marginLeft: "100px" }}>
              <img width="42px" height="42px" src={arrow}></img>
            </div>
          </button>
        ) : (
          <></>
        )}

        {levelState == "Success" ? (
          <>
            <button className={classes.successbutton}>
              <div style={{ marginTop: "16px", marginLeft: "100px" }}>
                <img width="42px" height="42px" src={done}></img>
              </div>
            </button>
          </>
        ) : (
          <></>
        )}
        {levelState == "Fail" ? (
          <>
            <button className={classes.errorButton}>
              <div style={{ marginTop: "22px", marginLeft: "110px" }}>
                <img width="32px" height="32px" src={wrong}></img>
              </div>
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
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
      justifyContent: "space-between",
    },
    mobileContainer: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
    },
    mobileRow: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "2em",
    },
    button: {
      backgroundColor: "#FFFFFF",
      color: "#5870F9",
      height: "80px",
      border: "2px solid #5870F9",
      width: "80px",
    },
    selectedButton: {
      backgroundColor: "#5870F9",
      color: "#FFFFFF",
      border: "2px solid #5870F9",
      outline: "none",
      height: "80px",
      width: "80px",
    },
    continueButton: {
      backgroundColor: "#5870F9",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
      border: "2px solid #5870F9",
      outline: "none",
    },
    successbutton: {
      background: "#F9E058",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
      border: "2px solid #F9E058",
      outline: "none",
    },
    errorButton: {
      background: "#F4302B",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
      border: "2px solid #F4302B",
      outline: "none",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1em",
    },
    h3: {
      marginTop: "6em",
      fontSize: "16px",
      fontWeight: "normal",
      textAlign: "center",
    },
  })
);

export default NoteReaderLevel;
