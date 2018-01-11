import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './../../redux/actions';
import options from './../../config/options';
import colors from './../../config/colorOptions';
import firebase from './../../config/firebase.js';
import getContrast from './../../utils/getContrast';
import repeatArray from './../../utils/repeatArray';
import mobileWidth from './../../utils/mobileWidth';
import Item from './Item';
import ItemStats from './ItemStats';
import ProgressBar from './ProgressBar';
import './questions.css';

class Questions extends Component {
  state = { toggleStats: false }

  componentDidMount() {
    const { history, optionIndex, match } = this.props;
    if (optionIndex >= options.length) {
      history.push('/results');
    } else if (match.params.optionIndex !== optionIndex) {
      history.push(`/quiz/${optionIndex}`);
    }
    window.addEventListener('keydown', this.useArrows);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.useArrows);
  }

  getLeftGate = (ref) => { this.leftGate = ref; }
  getRightGate = (ref) => { this.rightGate = ref; }

  useArrows = (e) => {
    const item = options[this.props.optionIndex];
    if (e.key === 'ArrowLeft' || e.key === 'ArrowTop') {
      this.selectItem(item[0])();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowBottom') {
      this.selectItem(item[1])();
    }
  }

  selectItem = opt => () => {
    const { history, optionIndex } = this.props;
    const nextIndex = optionIndex + 1;
    if (this.state.toggleStats) {
      this.handleSeeStats();
    }
    this.recordItem(opt, nextIndex);
    if (nextIndex > options.length - 1) {
      history.push('/results');
    } else {
      history.push(`/quiz/${nextIndex}`);
    }
  }

  recordItem = (option, nextIndex) => {
    const {
      gender, ageGroup, USState, choices, optionIndex,
    } = this.props;
    const itemRef = firebase.database().ref(`choices/${optionIndex}`);
    itemRef.transaction((o) => {
      const opts = o || {};
      const dataStructure = {
        total: opts.total || { option1: 0, option2: 0 },
        gender: opts.gender || {},
        ageGroup: opts.ageGroup || {},
        USState: opts.USState || {},
      };
      dataStructure.total = this.addOneToOptions(option, dataStructure.total);
      dataStructure.gender[gender] = this.addOneToOptions(option, dataStructure.gender[gender]);
      dataStructure.ageGroup[ageGroup] = this.addOneToOptions(option, dataStructure.ageGroup[ageGroup]); // eslint-disable-line
      dataStructure.USState[USState] = this.addOneToOptions(option, dataStructure.USState[USState]);
      return dataStructure;
    });
    const newChoices = [...choices, option];
    this.props.updateState({ key: 'choices', value: newChoices });
    this.props.updateState({ key: 'optionIndex', value: nextIndex });
    localStorage.setItem('choices', JSON.stringify(newChoices));
    localStorage.setItem('optionIndex', nextIndex);
  }

  addOneToOptions = (option, choices) => {
    const currentItem = choices || { option1: 0, option2: 0 };
    return {
      option1: option === 1 ? (currentItem.option1 || 0) + 1 : currentItem.option1,
      option2: option === 2 ? (currentItem.option2 || 0) + 1 : currentItem.option2,
    };
  }

  handleSeeStats = () => {
    if (this.state.toggleStats) {
      this.leftGate.style.left = '';
      this.rightGate.style.left = '';
      document.body.overflow = '';
    } else {
      this.leftGate.style.left = mobileWidth ? '-100%' : '-25%';
      this.rightGate.style.left = mobileWidth ? '100%' : '25%';
      document.body.overflow = 'hidden';
    }
    this.setState(prev => ({ toggleStats: !prev.toggleStats }));
  }

  render() {
    const { optionIndex } = this.props;
    const { toggleStats } = this.state;
    const item = options[optionIndex];
    const theColors = repeatArray(colors, options.length);
    this.color = theColors[optionIndex];
    const { option1, option2 } = this.color;
    const color1 = getContrast(option1) === '#ededed' ? ' white' : '';
    const color2 = getContrast(option2) === '#ededed' ? ' white' : '';
    const completed = (parseInt(optionIndex, 10) / options.length) * 100;
    return (
      <section className="questions-wrapper">
        <header>
          <Link to="/">
            <h1 style={{ color: getContrast(option1) }}>Two Types of People</h1>
          </Link>
          <button className={`my-button see-stats${color2}`} onClick={this.handleSeeStats}>
            {toggleStats ? 'Hide' : 'Show'} Stats
          </button>
        </header>
        <div className="wrapper sliding-doors">
          <div
            ref={this.getLeftGate}
            className="left-gate gate"
            style={{ background: option1 }}
          >
            <Item item={item[0]} color={color1} selectItem={this.selectItem} />
          </div>
          <div
            ref={this.getRightGate}
            className="right-gate gate"
            style={{ background: option2 }}
          >
            <Item item={item[1]} color={color2} selectItem={this.selectItem} />
          </div>
          {toggleStats &&
            <ItemStats
              colors={[option1, option2]}
              optionIndex={optionIndex}
              handleSeeStats={this.handleSeeStats}
              allData={this.props.allData}
            />
          }
          <ProgressBar color1={option1} color2={option2} completed={completed} />
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  choices: state.choices,
  optionIndex: state.optionIndex,
  gender: state.gender,
  ageGroup: state.ageGroup,
  USState: state.USState,
  allData: state.allData,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
  updateMultiple: changes => dispatch(updateMultiple(changes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
