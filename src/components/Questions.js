import React, { Component } from 'react';
import Results from './Results';
import options from './../options';
import colors from './../colors';
import firebase from './../firebase.js';

const repeatArray = (arr, count) => {
  const ln = arr.length;
  const b = [];
  for (let i = 0; i < count; i += 1) {
    b.push(arr[i % ln]);
  }
  return b;
};

const getContrast = (hexcolor) => {
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#525252' : '#ededed';
};

export default class Questions extends Component {
  state = { index: 0, choices: 0 }

  componentDidMount() {
    window.addEventListener('keydown', this.useArrows);
  }

  componentDidUpdate() {
    const title = document.getElementById('title');
    const buttons = document.getElementsByClassName('log-button');
    console.log(this.color.option1);
    title.style.color = getContrast(this.color.option1);
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.color = getContrast(this.color.option2);
      buttons[i].style.border = `1px solid ${getContrast(this.color.option2)}`;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.useArrows);
  }

  useArrows = (e) => {
    const item = options[this.state.index];
    if (e.key === 'ArrowLeft') {
      this.clickItem('one', item[0])();
    } else if (e.key === 'ArrowRight') {
      this.clickItem('two', item[1])();
    }
  }

  clickItem = (ref, opt) => () => {
    // const el = this[ref];
    // el.classList.add('big');
    this.recordItem(opt);
    // setTimeout(() => {
    // document.body.style.background = next;
    // el.classList.remove('big');
    this.setState(prev => ({ index: prev.index + 1 }));
    // }, 500);
  }

  recordItem = (option) => {
    const itemRef = firebase.database().ref(`choices/${this.state.index}`);
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
    const { index, choices } = this.state;
    const item = options[index];
    const theColors = repeatArray(colors, options.length);
    this.color = theColors[index];
    if (index > options.length - 1) {
      return <Results choices={choices} />;
    }
    return (
      <section className="quiz-wrapper">
        <div className="item-wrapper" style={{ background: this.color.option1 }}>
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
        <div className="item-wrapper" style={{ background: this.color.option2 }}>
          <div
            role="presentation"
            ref={(ref) => { this.two = ref; }}
            className="item"
            onClick={this.clickItem('two', item[0].points)}
          >
            <img src={`${process.env.PUBLIC_URL}/img/${item[1].image}`} alt="item 2" width="100%" />
          </div>
        </div>
      </section>
    );
  }
}
