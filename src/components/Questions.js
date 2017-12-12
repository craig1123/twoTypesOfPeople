import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import Results from './Results';
import options from './../options';
import colors from './../colors';
import getContrast from './../utils/getContrast';
import firebase from './../firebase.js';
import repeatArray from './../utils/repeatArray';
import Item from './Item';

export default class Questions extends Component {
  state = {
    choices: 0, optionIndex: 0, opt: '', sideEl: null,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.useArrows);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.useArrows);
  }

  getRefOne = (ref) => { this.one = ref; }
  getRefTwo = (ref) => { this.two = ref; }

  useArrows = (e) => {
    const item = options[this.state.optionIndex];
    if (e.key === 'ArrowLeft') {
      this.selectItem('one', item[0])();
    } else if (e.key === 'ArrowRight') {
      this.selectItem('two', item[1])();
    }
  }

  selectItem = (ref, opt) => () => {
    this.setState({ opt, sideEl: this[ref] });
  }

  handleNext = () => {
    const { opt, sideEl } = this.state;
    // sideEl.classList.add('big');
    this.recordItem(opt);
    this.updateOptionIndex(sideEl);
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

  updateOptionIndex = () => {
    // setTimeout(() => {
    // document.body.style.background = next;
    // el.classList.remove('big');
    this.setState(prev => ({ optionIndex: prev.optionIndex + 1, sideEl: null, opt: '' }));
    // }, 500);
  }

  render() {
    const { choices, optionIndex, sideEl } = this.state;
    if (optionIndex > options.length - 1) {
      return <Results choices={choices} />;
    }
    const item = options[optionIndex];
    const theColors = repeatArray(colors, options.length);
    const color = theColors[optionIndex];
    const color1 = getContrast(color.option1);
    const color2 = getContrast(color.option2) === '#ededed' ? ' white' : '';
    return (
      <React.Fragment>
        <header>
          <Link to="/">
            <h1 style={{ color: color1 }}>
              Two Types of People
            </h1>
          </Link>
          <button
            className={`my-button next${color2}${sideEl ? '' : ' blocked'}`}
            onClick={this.handleNext}
          >
            <span>Next </span>
            <span className="hovering">&rarr;</span>
          </button>
        </header>
        <section className="quiz-wrapper">
          <Item
            option={color.option1}
            getRef={this.getRefOne}
            item={item[0]}
            color={color1 === '#ededed' ? ' white' : ''}
            selectItem={this.selectItem}
          />
          <div className="vertical-line" />
          <Item
            option={color.option2}
            getRef={this.getRefTwo}
            item={item[1]}
            color={color2}
            selectItem={this.selectItem}
            render={(
              <button className={`my-button see-stats${color2}`}>
                See Stats
              </button>
            )}
          />
        </section>
      </React.Fragment>
    );
  }
}
