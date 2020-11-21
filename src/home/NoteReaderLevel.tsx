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

type NoteReaderLevelProp = {
  practicePool: Array<string>;
};

export const NoteReaderLevel = ({ practicePool }: NoteReaderLevelProp) => {
  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const [currentNote, setCurrentNote] = useState(getRandomNoteFromNotePool);

  const checkNote = (selectedNote: string) => {
    if (selectedNote === currentNote) {
      setCurrentNote(getRandomNoteFromNotePool);
    }
  };
  const classes = useStyles();

  return (
    <>
      <Score note={currentNote} />
      <div className={classes.container}>
        {practicePool.map((note) => {
          return <Button  key={note} className={classes.button} onClick={() => {checkNote(note)}}><h1>{note.charAt(0)}</h1></Button>;
        })}
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
      backgroundColor: "#5870F9",
      color: "#FFFFFF",
      height: "80px",
      width: "80px"
    },
    h3: {
      fontSize: "64px"

    }
  })
);

export default NoteReaderLevel;
