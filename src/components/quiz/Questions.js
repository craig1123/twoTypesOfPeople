import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import options from './../../config/options';
import colors from './../../config/colorOptions';
import firebase from './../../config/firebase.js';
import getContrast from './../../utils/getContrast';
import repeatArray from './../../utils/repeatArray';
import Item from './Item';
import ItemStats from './ItemStats';

export default class Questions extends Component {
  state = { choices: 0, toggleStats: false }

  componentDidMount() {
    window.addEventListener('keydown', this.useArrows);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.useArrows);
  }

  getLeftGate = (ref) => { this.leftGate = ref; }
  getRightGate = (ref) => { this.rightGate = ref; }

  useArrows = (e) => {
    const item = options[this.props.match.params.optionIndex];
    if (e.key === 'ArrowLeft') {
      this.selectItem(item[0])();
    } else if (e.key === 'ArrowRight') {
      this.selectItem(item[1])();
    }
  }

  selectItem = opt => () => {
    const { history, match } = this.props;
    const { optionIndex } = match.params;
    this.recordItem(opt);

    // TODO: Use setState here and then a redirect below so we can pass
    // this.state.choices in the to={}
    if (optionIndex > options.length - 1) {
      history.push('/results');
    } else {
      history.push(`/quiz/${parseInt(optionIndex, 10) + 1}`);
    }
  }

  recordItem = (option) => {
    const itemRef = firebase.database().ref(`choices/${this.props.match.params.optionIndex}`);
    itemRef.transaction((opts) => {
      const currentItem = opts || { option1: 0, option2: 0 };
      return {
        option1: option === 1 ? (currentItem.option1 || 0) + 1 : currentItem.option1,
        option2: option === 2 ? (currentItem.option2 || 0) + 1 : currentItem.option2,
      };
    });
    this.setState(prev => ({ choices: prev.choices + option }));
  }

  handleSeeStats = () => {
    if (this.state.toggleStats) {
      this.leftGate.style.right = '';
      this.leftGate.style.left = '';
      this.rightGate.style.left = '';
      this.rightGate.style.right = '';
    } else {
      this.leftGate.style.right = '25%';
      this.leftGate.style.left = '-25%';
      this.rightGate.style.left = '25%';
      this.rightGate.style.right = '-25%';
    }
    this.setState(prev => ({ toggleStats: !prev.toggleStats }));
  }

  render() {
    const { optionIndex } = this.props.match.params;
    const { toggleStats } = this.state;
    const item = options[optionIndex];
    const theColors = repeatArray(colors, options.length);
    this.color = theColors[optionIndex];
    const color1 = getContrast(this.color.option1);
    const color2 = getContrast(this.color.option2) === '#ededed' ? ' white' : '';
    return (
      <React.Fragment>
        <header>
          <Link to="/">
            <h1 style={{ color: color1 }}>Two Types of People</h1>
          </Link>
          <button className={`my-button see-stats${color2}`} onClick={this.handleSeeStats}>
            See Stats
          </button>
        </header>
        <section className="wrapper sliding-doors">
          <div
            ref={this.getLeftGate}
            className="left-gate gate"
            style={{ background: this.color.option1 }}
          >
            <Item
              item={item[0]}
              color={color1 === '#ededed' ? ' white' : ''}
              selectItem={this.selectItem}
            />
          </div>
          <div
            ref={this.getRightGate}
            className="right-gate gate"
            style={{ background: this.color.option2 }}
          >
            <Item item={item[1]} color={color2} selectItem={this.selectItem} />
          </div>
          {toggleStats &&
          <ItemStats
            colors={[this.color.option1, this.color.option2]}
            optionIndex={optionIndex}
            handleSeeStats={this.handleSeeStats}
          />
            }
        </section>
      </React.Fragment>
    );
  }
}
