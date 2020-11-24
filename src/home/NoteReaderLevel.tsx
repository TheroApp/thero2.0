import React, { useEffect, useState } from "react";
import { Score } from "../Vexflow";
import {
  Container,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, responsiveFontSizes, Theme } from "@material-ui/core/styles";
import arrow from '../images/thin_big_right.png';
import done from "../images/done.svg";
import "../index.css";

type NoteReaderLevelProp = {
  practicePool: Array<string>;
};

export const NoteReaderLevel = ({ practicePool }: NoteReaderLevelProp) => {
  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const [currentNote, setCurrentNote] = useState(getRandomNoteFromNotePool);
  const [selectedNote, setSelectedNote] = useState('');
  const [levelState, setLevelState] = useState(false);

  const [score, setScore] = useState(0);

  const checkNote = (selectedNote: string) => {
    if (selectedNote === currentNote) {
      setScore(score + 1);
      setLevelState(true);
      setSelectedNote('');
    }
  };

  const getNewNote = () => {
    var randomNote = getRandomNoteFromNotePool();
    setCurrentNote(randomNote);
    setLevelState(false);
  }

  const classes = useStyles();

  return (
    <>
      <h3 className={classes.h3}>What is this note?</h3>
      <Score note={currentNote} />
      <div className={classes.container}>
        {practicePool.map((note) => {
          return <Button key={note} className={selectedNote === note ? classes.selectedButton : classes.button} onClick={() => { setSelectedNote(note) }}><h1>{note.charAt(0)}</h1></Button>;
        })}
      </div>
      {selectedNote ?
        <Button key="fucl upi" className={classes.continueButton} onClick={() => { checkNote(selectedNote) }}>
          <div style={{ marginTop: "20px" }}>
            <img width="42px" height="42px" src={arrow}></img>
          </div>
        </Button>
        : <></>}

      {levelState ?
        <>
          <Button className={classes.successbutton} onClick={() => { getNewNote() }}>
            <div style={{ marginTop: "20px" }}>
              <img width="42px" height="42px" src={done}></img>
            </div>
          </Button>
        </>
        : <></>
      }
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
      width: "80px"
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
      display: "flex",
      justifyContent: "center",
      marginTop: "150px",
      marginLeft: "150px",
      filter: "drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25))"
    },
    successbutton: {
      background: "#F9E058",
      height: "82px",
      width: "250px",
      borderRadius: "24px",
      display: "flex",
      justifyContent: "center",
      marginTop: "150px",
      marginLeft: "150px",
      filter: "drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25))"
    },
    h3: {
      marginTop: "2em",
      fontSize: "16px",
      fontWeight: "normal",
      textAlign: "center"
    }
  })
);

export default NoteReaderLevel;
