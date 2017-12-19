import React, { Component, Fragment } from 'react';
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

class Questions extends Component {
  state = { toggleStats: false }

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
    if (e.key === 'ArrowLeft' || e.key === 'ArrowTop') {
      this.selectItem(item[0])();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowBottom') {
      this.selectItem(item[1])();
    }
  }

  selectItem = opt => () => {
    const { history, match } = this.props;
    const nextIndex = parseInt(match.params.optionIndex, 10) + 1;
    if (this.state.toggleStats) {
      this.handleSeeStats();
    }
    this.recordItem(opt);
    if (nextIndex > options.length - 1) {
      history.push('/results');
    } else {
      history.push(`/quiz/${nextIndex}`);
    }
  }

  recordItem = (option) => {
    const {
      gender, ageGroup, USState, choices, match,
    } = this.props;
    const itemRef = firebase.database().ref(`choices/${match.params.optionIndex}`);
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
    localStorage.setItem('choices', newChoices);
    localStorage.setItem('optionIndex', parseInt(match.params.optionIndex, 10) + 1);
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
    const { optionIndex } = this.props.match.params;
    const { toggleStats } = this.state;
    const item = options[optionIndex];
    const theColors = repeatArray(colors, options.length);
    this.color = theColors[optionIndex];
    const color1 = getContrast(this.color.option1);
    const color2 = getContrast(this.color.option2) === '#ededed' ? ' white' : '';
    return (
      <Fragment>
        <header>
          <Link to="/">
            <h1 style={{ color: color1 }}>Two Types of People</h1>
          </Link>
          <button className={`my-button see-stats${color2}`} onClick={this.handleSeeStats}>
            {toggleStats ? 'Hide' : 'Show'} Stats
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
              allData={this.props.allData}
            />
          }
        </section>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  choices: state.choices,
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
