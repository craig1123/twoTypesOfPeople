import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link';

export default class StartButton extends PureComponent {
  componentDidMount() {
    const threeStyle = this.three.style;
    const aElem = document.getElementById('start-quiz');
    const boundingClientRect = aElem.getBoundingClientRect();
    const xc = boundingClientRect.width / 2;
    const yc = boundingClientRect.height / 2;

    aElem.onmousemove = (e) => {
      const x = e.clientX - boundingClientRect.left;
      const y = e.clientY - boundingClientRect.top;
      const dx = (x - xc) / 2;
      const dy = (y - yc) * -1.5;
      threeStyle.setProperty('--rx', `${dy}deg`);
      threeStyle.setProperty('--ry', `${dx}deg`);
    };
    aElem.onmouseleave = () => {
      threeStyle.setProperty('--ty', '0');
      threeStyle.setProperty('--rx', '0');
      threeStyle.setProperty('--ry', '0');
    };
    aElem.onmousedown = () => {
      threeStyle.setProperty('--tz', '-25px');
    };
    this.three.onmouseup = () => {
      threeStyle.setProperty('--tz', '-12px');
    };
  }

  threeRef = (ref) => { this.three = ref; }

  render() {
    const {
      startLink, optionIndex, gender, ageGroup,
    } = this.props;
    let title = `${optionIndex === 0 ? 'Start' : 'Continue'} Quiz`;
    title = startLink === '/results' ? 'See Results' : title;
    return (
      <div className="three-d" ref={this.threeRef}>
        <Link
          style={!gender || !ageGroup ? { pointerEvents: 'none', opacity: '.7' } : null}
          to={startLink}
          id="start-quiz"
          data-title={title}
        />
      </div>
    );
  }
}
