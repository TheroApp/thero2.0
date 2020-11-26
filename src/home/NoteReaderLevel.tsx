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

type NoteReaderLevelProp = {
  practicePool: Array<string>;
  setSelectedLevel: Function;
};

export const NoteReaderLevel = ({
  practicePool,
  setSelectedLevel,
}: NoteReaderLevelProp) => {
  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const [currentNote, setCurrentNote] = useState(getRandomNoteFromNotePool);
  const [selectedNote, setSelectedNote] = useState("");
  const [levelState, setLevelState] = useState("");

  const [score, setScore] = useState(0);

  const checkNote = (selectedNote: string) => {
    if (selectedNote === currentNote) {
      setScore(score + 1);
      setLevelState("Success");
      setSelectedNote("");
    } else {
      setLevelState("Fail");
      setSelectedNote("");
    }
  };

  const getNewNote = () => {
    if (score == 10) {
      setSelectedLevel("");
    }
    var randomNote = getRandomNoteFromNotePool();
    while (randomNote == currentNote) {
      randomNote = getRandomNoteFromNotePool();
    }
    setCurrentNote(randomNote);
    setLevelState("");
  };

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
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
      <div className={classes.container}>
        {practicePool.map((note) => {
          return (
            <Button
              disabled={levelState === "" ? false : true}
              key={note}
              className={
                selectedNote === note ? classes.selectedButton : classes.button
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
      <div className={classes.buttonContainer}>
        {selectedNote ? (
          <Button
            className={classes.continueButton}
            onClick={() => {
              checkNote(selectedNote);
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <img width="42px" height="42px" src={arrow}></img>
            </div>
          </Button>
        ) : (
          <></>
        )}

        {levelState == "Success" ? (
          <>
            <Button
              className={classes.successbutton}
              onClick={() => {
                getNewNote();
              }}
            >
              <div style={{ marginTop: "20px" }}>
                <img width="42px" height="42px" src={done}></img>
              </div>
            </Button>
          </>
        ) : (
          <></>
        )}
        {levelState == "Fail" ? (
          <>
            <Button
              className={classes.errorButton}
              onClick={() => {
                getNewNote();
              }}
            >
              <div style={{ marginTop: "25px" }}>
                <img width="32px" height="32px" src={wrong}></img>
              </div>
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
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
      height: "80px",
      width: "80px",
    },
    continueButton: {
      backgroundColor: "#5870F9",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
    },
    successbutton: {
      background: "#F9E058",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
    },
    errorButton: {
      background: "#F4302B",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5em",
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
