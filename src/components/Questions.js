import React, { Component } from 'react';
import Results from './Results';
import options from './../options';
import firebase from './../firebase.js';

export default class Questions extends Component {
  state = { index: 0, choices: 0 }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      const item = options[this.state.index];
      if (e.key === 'ArrowLeft') {
        this.clickItem('one', item[0])();
      } else if (e.key === 'ArrowRight') {
        this.clickItem('two', item[1])();
      }
    });
  }

  clickItem = (ref, opt) => () => {
    const el = this[ref];
    el.classList.add('big');
    this.recordItem(opt);
    setTimeout(() => {
      // document.body.style.background = next;
      el.classList.remove('big');
      this.setState(prev => ({ index: prev.index + 1 }));
    }, 500);
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
    if (index > options.length - 1) {
      return <Results choices={choices} />;
    }
    return (
      <section className="quiz-wrapper">
        <div
          role="presentation"
          ref={(ref) => { this.one = ref; }}
          className="item"
          onClick={this.clickItem('one', 1)}
        >
          <img alt="item 1" src={`${process.env.PUBLIC_URL}/img/${item[0]}`} />
        </div>
        <div
          role="presentation"
          ref={(ref) => { this.two = ref; }}
          className="item"
          onClick={this.clickItem('two', 2)}
        >
          <img alt="item 2" src={`${process.env.PUBLIC_URL}/img/${item[1]}`} />
        </div>
      </section>
    );
  }
}
