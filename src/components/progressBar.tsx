import React from "react";
import circleLogo from "../images/circle-logo.png";
import "./progressBar.scss";

type ProgressBarProp = {
  completed: number;
};

const ProgressBar = ({ completed }: ProgressBarProp) => {
  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <>
      <div className="progress-bar--base">
        <div className="progress-bar--fill" style={fillerStyles}></div>
      </div>
      <div style={{ height: "24px", marginLeft: "12px" }}>
        <img width="20px" height="20px" src={circleLogo}></img>
      </div>
    </>
  );
};

export default ProgressBar;
