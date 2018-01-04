import React from 'react';

const ProgressBar = ({ completed, color1, color2 }) => (
  <div className="progress-bar-wrapper">
    <div className="progress-bar">
      <div
        className="progress-bar-status"
        style={{ width: `${completed}%`, background: `#fff linear-gradient(to right, ${color2}, ${color1})` }}
      />
    </div>
  </div>
);

ProgressBar.defaultProps = {
  completed: 0,
};

export default ProgressBar;
