import React, { useState } from "react";
import { RhythmScore, Score } from "../components/vexflow/Vexflow";
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

type RhythmLevelProp = {
  practicePool: Array<string>;
  setSelectedLevel: Function;
  user: any;
  globalScore: number;
  levelNum: number;
  userGoalLevels: Array<number>;
  userProgressPerGoalLevels: Array<number>;
  goalSetDate: string;
  goalDueDate: string;
};

export const RhythmLevel = ({
  practicePool,
  setSelectedLevel,
  user,
  globalScore,
  levelNum,
  userGoalLevels,
  userProgressPerGoalLevels,
  goalSetDate,
  goalDueDate,
}: RhythmLevelProp) => {
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

      feedbackText = `Good work! It's worth ${getCounts(currentNote)} ${
        getCounts(currentNote) == "½" || getCounts(currentNote) == "¼"
          ? "a "
          : ""
      }count${
        getCounts(currentNote) == 2 || getCounts(currentNote) == 4 ? "s" : ""
      }`;

      if (levelNum >= 17) {
        feedbackText = `Good work! It's a ${getName(currentNote)} ${
          levelNum == 18 ? "rest" : ""
        }`;
      }
      break;
    case "Fail":
      submitButtonClass = "--error";
      feedbackText = `It's worth ${getCounts(currentNote)} ${
        getCounts(currentNote) == "½" || getCounts(currentNote) == "¼"
          ? "a "
          : ""
      }count${
        getCounts(currentNote) == 2 || getCounts(currentNote) == 4 ? "s" : ""
      }`;
      if (levelNum >= 17) {
        feedbackText = `It's a ${getName(currentNote)} ${
          levelNum == 18 ? "rest" : ""
        }`;
      }
      break;
  }

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar className="toolbar-container">
          <IconButton
            edge="start"
            color="default"
            aria-label="back"
            onClick={() => {
              setSelectedLevel("");
            }}
          >
            <ArrowBack />
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
        {levelNum < 17
          ? `How many counts does this ${
              levelNum == 15 ? "note" : "rest"
            } have?`
          : `What's the name of this rhythm ${
              levelNum == 17 ? "note" : "rest"
            }?`}
      </h4>
      <div style={{ marginTop: "16vh" }}>
        <RhythmScore
          duration={currentNote}
          vhWidth={useWindowWidth()}
          vhHeight={useWindowHeight()}
        />
      </div>
      <div
        className={
          levelNum < 17 ? "answer-buttons-container" : "name-answer-container"
        }
      >
        {fourOptions.map((note) => {
          return (
            <Button
              disabled={levelState !== "Idle"}
              key={note}
              className={`${
                levelNum < 17 ? "answer-button" : "answer-button-name"
              } ${
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
              <span>{levelNum < 17 ? getCounts(note) : getName(note)}</span>
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

export default RhythmLevel;

function getCounts(duration: string): React.ReactNode {
  if (duration.includes("q")) {
    return 1;
  } else if (duration.includes("h")) {
    return 2;
  } else if (duration.includes("w")) {
    return 4;
  } else if (duration.includes("8")) return "½";
  else {
    return "¼";
  }
}

function getName(duration: string): React.ReactNode {
  if (duration.includes("q")) {
    return "Crotchet";
  } else if (duration.includes("h")) {
    return "Minim";
  } else if (duration.includes("w")) {
    return "Semibreve";
  } else if (duration.includes("8")) return "Quaver";
  else {
    return "Semiquaver";
  }
}
