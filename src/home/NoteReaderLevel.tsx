import React, { useEffect, useState } from "react";
import { Score } from "../Vexflow";
import {
  Container,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type NoteReaderLevelProp = {
  practicePool: Array<string>;
}

export const NoteReaderLevel = ({practicePool}: NoteReaderLevelProp) => {
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
        <Button onClick={() => checkNote("b/4")}>B</Button>
        <Button onClick={() => checkNote("c/5")}>C</Button>
        <Button onClick={() => checkNote("d/5")}>D</Button>
        <Button onClick={() => checkNote("e/5")}>E</Button>
        <Button onClick={() => checkNote("f/5")}>F</Button>
        <Button onClick={() => checkNote("g/5")}>G</Button>
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
      justifyContent: "center",
    },
  })
);

export default NoteReaderLevel;
