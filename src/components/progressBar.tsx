import React from "react";
import circleLogo from "../images/circle-logo.png";

type ProgressBarProp = {
  completed: number;
};

const ProgressBar = ({ completed }: ProgressBarProp) => {
  const containerStyles = {
    height: 3,
    width: "80%",
    margin: "auto",
    backgroundColor: "#F0BCFA",
    opacity: 0.5,
  };

  const fillerStyles = {
    height: 7,
    marginTop: -2,
    width: `${completed}%`,
    backgroundColor: "#798DFA",
    transition: "width 1s ease-in-out",
    opacity: 1,
    borderRadius: 3,
  };

  return (
    <>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
      <div style={{height:"24px"}}>
        <img width="20px" height="20px" src={circleLogo}></img>
      </div>
    </>
  );
};

export default ProgressBar;
