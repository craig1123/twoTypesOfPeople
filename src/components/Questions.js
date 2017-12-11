import React, { Component } from 'react';
import Results from './Results';
import options from './../options';
import colors from './../colors';
import getContrast from './../utils/getContrast';
import firebase from './../firebase.js';
import repeatArray from './../utils/repeatArray';

export default class Questions extends Component {
  state = { choices: 0 }

  componentDidMount() {
    window.addEventListener('keydown', this.useArrows);
    this.props.handleStartQuiz();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.useArrows);
  }

  useArrows = (e) => {
    const item = options[this.props.optionIndex];
    if (e.key === 'ArrowLeft') {
      this.clickItem('one', item[0])();
    } else if (e.key === 'ArrowRight') {
      this.clickItem('two', item[1])();
    }
  }

  clickItem = (ref, opt) => () => {
    const el = this[ref];
    // el.classList.add('big');
    this.recordItem(opt);
    this.props.updateOptionIndex(el);
  }

  recordItem = (option) => {
    const itemRef = firebase.database().ref(`choices/${this.state.optionIndex}`);
    itemRef.transaction((opts) => {
      const currentItem = opts || { option1: 0, option2: 0 };
      return {
        option1: option === 1 ? (currentItem.option1 || 0) + 1 : currentItem.option1,
        option2: option === 2 ? (currentItem.option2 || 0) + 1 : currentItem.option2,
      };
    });
    this.setState(prev => ({ choices: prev.choices + option }));
  }

  render() {
    const { choices } = this.state;
    const { optionIndex } = this.props;
    const item = options[optionIndex];
    const theColors = repeatArray(colors, options.length);
    const color = theColors[optionIndex];
    const color2 = getContrast(color.option2) === '#ededed' ? ' white' : '';
    if (optionIndex > options.length - 1) {
      return <Results choices={choices} />;
    }
    return (
      <section className="quiz-wrapper">
        <div className="item-wrapper" style={{ background: color.option1 }}>
          <div
            role="presentation"
            ref={(ref) => { this.one = ref; }}
            className="item"
            onClick={this.clickItem('one', item[0].points)}
          >
            <img src={`${process.env.PUBLIC_URL}/img/${item[0].image}`} alt="item 1" width="100%" />
          </div>
        </div>
        <div className="vertical-line" />
        <div className="item-wrapper" style={{ background: color.option2 }}>
          <div
            role="presentation"
            ref={(ref) => { this.two = ref; }}
            className="item"
            onClick={this.clickItem('two', item[0].points)}
          >
            <img src={`${process.env.PUBLIC_URL}/img/${item[1].image}`} alt="item 2" width="100%" />
          </div>
          <button className={`my-button see-stats${color2}`}>
            See Stats
          </button>
        </div>
      </section>
    );
  }
}
