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
import "typeface-karla";
import "@vetixy/circular-std";
import { useWindowWidth, useWindowHeight } from "@react-hook/window-size";

function getFingeringForNote(note: string) {
  switch (note) {
    case "g/2":
      return "G0";
    case "a/3":
      return "G1";
    case "b/3":
      return "G2";
    case "c/4":
      return "G3";
    case "d/4":
      return "D0";
    case "e/4":
      return "D1";
    case "f/4":
      return "D2";
    case "g/4":
      return "D3";
    case "a/4":
      return "A0";
    case "b/4":
      return "A1";
    case "c/5":
      return "A2";
    case "d/5":
      return "A3";
    case "e/5":
      return "E0";
    case "f/5":
      return "E1";
    case "g/5":
      return "E2";
    case "a/5":
      return "E3";
  }
}
type NoteReaderLevelProp = {
  practicePool: Array<string>;
  setSelectedLevel: Function;
  user: any;
  globalScore: number;
  levelNum: number;
  showFingerPosition: boolean;
  userGoalLevels: Array<number>;
  userProgressPerGoalLevels: Array<number>;
  goalSetDate: string;
  goalDueDate: string;
};

export const NoteReaderLevel = ({
  practicePool,
  setSelectedLevel,
  user,
  globalScore,
  levelNum,
  showFingerPosition,
  userGoalLevels,
  userProgressPerGoalLevels,
  goalSetDate,
  goalDueDate,
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
      var studentUser;

      if (
        userGoalLevels.includes(levelNum) &&
        Date.now() > new Date(0).setUTCMilliseconds(parseInt(goalSetDate)) &&
        Date.now() <= new Date(0).setUTCMilliseconds(parseInt(goalDueDate))
      ) {
        const index = userGoalLevels.findIndex((e) => levelNum === e);
        console.log(index);
        var temp = userProgressPerGoalLevels;
        temp.splice(index, 1, temp[index] + 1);

        console.log(temp);

        studentUser = {
          id: user.attributes.sub,
          score: total,
          goalProgressPerLevel: temp,
        };
      } else {
        studentUser = {
          id: user.attributes.sub,
          score: total,
        };
      }
      console.log(user);

      if (user !== undefined) {
        try {
          const studentUserData: any = await API.graphql({
            query: updateStudentUser,
            variables: { input: studentUser },
          });
        } catch {
          console.log("Failed to update user");
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
  let feedbackText = "Placeholder";
  switch (levelState) {
    case "Success":
      submitButtonClass = "--success";
      if (levelNum >= 7) {
        feedbackText = `Good work! You play this note with ${getFingeringForNote(
          selectedNote
        )}`;
      } else {
        feedbackText = `Good work! This is ${selectedNote
          .charAt(0)
          .toUpperCase()}`;
      }
      break;
    case "Fail":
      submitButtonClass = "--error";
      if (levelNum >= 7) {
        feedbackText = `This is played with ${getFingeringForNote(
          currentNote
        )}`;
      } else {
        feedbackText = `This is ${currentNote.charAt(0).toUpperCase()}`;
      }
      break;
  }

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar className="toolbar-container">
          <IconButton edge="start" color="default" aria-label="back">
            <ArrowBack
              onClick={() => {
                setSelectedLevel("");
              }}
            />
          </IconButton>
          <ProgressBar completed={score * 10}></ProgressBar>
          <Typography
            align="right"
            color="textPrimary"
            display="block"
            style={{ marginLeft: "8px", fontFamily: "Karla" }}
          >
            {`${score}/10`}
          </Typography>
        </Toolbar>
      </AppBar>
      <h4 className="note-reader-level-title">
        {levelNum >= 7
          ? "Which string and finger do you use to play this note?"
          : "What is the name of this note?"}
      </h4>
      <Score
        keySignature={levelNum >= 7 ? "A" : "C"}
        note={currentNote}
        vhWidth={useWindowWidth()}
        vhHeight={useWindowHeight()}
      />
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
              <span>
                {showFingerPosition
                  ? getFingeringForNote(note)
                  : note.charAt(0)}
              </span>
            </Button>
          );
        })}
      </div>
      <div className={`submit-button-background${submitButtonClass}`}>
        <div className="submit-button-and-feedback-container">
          <div className={`feedback-text${submitButtonClass}`}>
            {feedbackText}
          </div>
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
              className={`submit-button submit-button${submitButtonClass}`}
              onClick={() => {
                getNewNote();
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteReaderLevel;
