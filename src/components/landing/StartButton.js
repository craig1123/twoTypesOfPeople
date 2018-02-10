import React from 'react';
import Link from 'react-router-dom/Link';

export default (props) => {
  const {
    startLink, optionIndex, gender, ageGroup,
  } = props;
  let title = `${optionIndex === 0 ? 'Start' : 'Continue'} Quiz`;
  title = startLink === '/results' ? 'See Results' : title;
  return (
    <div className="three-d">
      <Link
        style={!gender || !ageGroup ? { pointerEvents: 'none', opacity: '.7' } : null}
        to={startLink}
        id="start-quiz"
        data-title={title}
      />
    </div>
  );
};
