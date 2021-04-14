import React, { useState } from "react";
import { ElementScore } from "../components/vexflow/Vexflow";
import { Toolbar, IconButton, Button, Typography } from "@material-ui/core";
import "../index.css";
import AppBar from "@material-ui/core/AppBar";
import { ArrowBack, ViewHeadline } from "@material-ui/icons";
import ProgressBar from "../components/progressBar";
import { createStudentHistory, updateStudentUser } from "../graphql/mutations";
import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import "./noteReaderLevel.scss";
import "typeface-karla";
import "@vetixy/circular-std";
import { useWindowWidth, useWindowHeight } from "@react-hook/window-size";

type ElementsLevelProp = {
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

export const ElementsLevel = ({
  practicePool = ["Time Signature", "Bar", "Bar-line", "Double bar-line"],
  setSelectedLevel,
  user,
  globalScore,
  levelNum,
  userGoalLevels,
  userProgressPerGoalLevels,
  goalSetDate,
  goalDueDate,
}: ElementsLevelProp) => {
  const getRandomElement = () => {
    return practicePool[Math.floor(Math.random() * practicePool.length)];
  };

  const shuffleElements = () => {
    //shuffle the array
    let i = practicePool.length - 1;
    for (i; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = practicePool[i];
      practicePool[i] = practicePool[j];
      practicePool[j] = temp;
    }
    return practicePool;
  };

  const [currentElement, setCurrentElement] = useState(getRandomElement);
  const [selectedElement, setSelectedElement] = useState("");
  const [levelState, setLevelState] = useState<"Success" | "Fail" | "Idle">(
    "Idle"
  );
  const [fourOptions, setFourOptions] = useState(practicePool);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);

  const checkNote = (selectedNote: string) => {
    setTries(tries + 1);
    if (selectedNote === currentElement) {
      setScore(score + 1);
      setLevelState("Success");
    } else {
      setLevelState("Fail");
    }
  };

  const getNewElement = async () => {
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
          await API.graphql({
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
    let randomElement = getRandomElement();
    while (randomElement === currentElement) {
      randomElement = getRandomElement();
    }
    setCurrentElement(randomElement);
    setFourOptions(shuffleElements());

    setLevelState("Idle");
    setSelectedElement("");
  };

  let submitButtonClass = "";
  let feedbackText = "Placeholder";
  switch (levelState) {
    case "Success":
      submitButtonClass = "--success";
      feedbackText = `Good work! It's a ${currentElement}`;
      break;
    case "Fail":
      submitButtonClass = "--error";
      feedbackText = `It's a ${currentElement}`;
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
      <h4 className="note-reader-level-title">What is this called?</h4>
      <div style={{ marginTop: "16vh" }}>
        <ElementScore
          element={currentElement}
          vhWidth={useWindowWidth()}
          vhHeight={useWindowHeight()}
        />
      </div>
      <div
        className={"name-answer-container"}
        style={{ flexDirection: "column" }}
      >
        {fourOptions.map((element) => {
          return (
            <Button
              disabled={levelState !== "Idle"}
              key={element}
              className={`${"answer-button-name"} ${
                selectedElement === element &&
                levelState === "Idle" &&
                "answer-button--selected"
              } ${
                element === currentElement &&
                levelState === "Success" &&
                "answer-button--success"
              } ${
                levelState === "Fail" &&
                selectedElement === element &&
                "answer-button--fail"
              }`}
              onClick={() => {
                setSelectedElement(element);
              }}
            >
              <span>{element}</span>
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
              disabled={selectedElement === ""}
              className={`submit-button ${
                selectedElement === "" && "submit-button--disabled"
              }`}
              onClick={() => {
                checkNote(selectedElement);
              }}
            >
              Check
            </button>
          )}

          {levelState !== "Idle" && (
            <button
              className={`submit-button submit-button${submitButtonClass}`}
              onClick={() => {
                getNewElement();
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

export default ElementsLevel;
