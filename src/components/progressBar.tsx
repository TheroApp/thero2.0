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
    <div className="progress-bar--base">
      <div className="progress-bar--fill" style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
