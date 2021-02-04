import React, { useState } from "react";
import { Score } from "../components/vexflow/Vexflow";
import { Toolbar, IconButton, Button, Typography } from "@material-ui/core";
import "../index.css";
import AppBar from "@material-ui/core/AppBar";
import { ArrowBack } from "@material-ui/icons";
import ProgressBar from "../components/progressBar";
import { createStudentHistory, updateStudentUser } from "../graphql/mutations";
import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import "./noteReaderLevel.scss";

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
  levelNum,
}: NoteReaderLevelProp) => {
  const getRandomNoteFromNotePool = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const getFourOptions = (rightAnswer: string) => {
    let first = [rightAnswer];
    let note = practicePool[Math.floor(Math.random() * practicePool.length)];

    while (first.length < 4) {
      if (!first.includes(note)) {
        first.push(note);
      }
      note = practicePool[Math.floor(Math.random() * practicePool.length)];
    }

    //shuffle the array
    let i = first.length - 1;
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
  const [levelState, setLevelState] = useState<"Success" | "Fail" | "Idle">(
    "Idle"
  );
  const [fourOptions, setFourOptions] = useState(getFourOptions(currentNote));
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);

  const checkNote = (selectedNote: string) => {
    setTries(tries + 1);
    if (selectedNote === currentNote) {
      setScore(score + 1);
      setLevelState("Success");
    } else {
      setLevelState("Fail");
    }
  };

  const getNewNote = async () => {
    if (score === 10) {
      const calcScore = Math.round(100 - (tries - 10) * 10);
      const total = globalScore + calcScore;

      if (user !== undefined) {
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
      }
      setSelectedLevel("");
    }
    let randomNote = getRandomNoteFromNotePool();
    while (randomNote === currentNote) {
      randomNote = getRandomNoteFromNotePool();
    }
    setCurrentNote(randomNote);
    setFourOptions(getFourOptions(randomNote));

    setLevelState("Idle");
    setSelectedNote("");
  };

  let submitButtonClass = "";
  switch (levelState) {
    case "Success":
      submitButtonClass = "submit-button--success";
      break;
    case "Fail":
      submitButtonClass = "submit-button--error";
      break;
  }

  return (
    <div style={{ height: "70vh" }}>
      <AppBar position="absolute">
        <Toolbar className="toolbar-container">
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack
              onClick={() => {
                setSelectedLevel("");
              }}
            />
          </IconButton>
          <ProgressBar completed={score * 10}></ProgressBar>
          <Typography align="right" color="textPrimary" display="block" style={{marginLeft:"8px"}}>
            {`${score}/10`}
          </Typography>
        </Toolbar>
      </AppBar>
      <h4 className="note-reader-level-title">What is this note?</h4>
      <Score note={currentNote} />
      <div className="answer-buttons-container">
        {fourOptions.map((note) => {
          return (
            <Button
              disabled={levelState !== "Idle"}
              key={note}
              className={`answer-button ${
                selectedNote === note &&
                levelState === "Idle" &&
                "answer-button--selected"
              } ${
                note === currentNote &&
                levelState === "Success" &&
                "answer-button--success"
              } ${
                levelState === "Fail" &&
                selectedNote === note &&
                "answer-button--fail"
              }`}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              <span>{note.charAt(0)}</span>
            </Button>
          );
        })}
      </div>
      <div className="submit-button-container">
        {levelState === "Idle" && (
          <button
            disabled={selectedNote === ""}
            className={`submit-button ${
              selectedNote === "" && "submit-button--disabled"
            }`}
            onClick={() => {
              checkNote(selectedNote);
            }}
          >
            Check
          </button>
        )}

        {levelState !== "Idle" && (
          <button
            className={`submit-button ${submitButtonClass}`}
            onClick={() => {
              getNewNote();
            }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteReaderLevel;
