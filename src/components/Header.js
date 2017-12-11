import React from 'react';
import Link from 'react-router-dom/Link';
import colors from './../colors';
import getContrast from './../utils/getContrast';
import repeatArray from './../utils/repeatArray';
import options from './../options';

const Header = ({ optionIndex, startQuiz, handleEndQuiz }) => {
  const theColors = repeatArray(colors, options.length);
  const color = theColors[optionIndex];
  const color2 = getContrast(color.option2) === '#ededed' ? ' white' : '';
  const linkStyle = { color: getContrast(color.option1) };
  return (
    <header>
      <Link to="/" onClick={handleEndQuiz}>
        <h1 style={linkStyle}>Two Types of People</h1>
      </Link>
      {startQuiz &&
        <button className={`my-button next${color2}`}>
          <span>Next </span>
          <span className="hovering">&rarr;</span>
        </button>
      }
    </header>
  );
};

export default Header;
