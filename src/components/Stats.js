import React, { Component } from 'react';
import firebase from './../firebase.js';
import Slice from './Slice';

const radius = 150;
const diameter = radius * 2;

export default class Stats extends Component {
  state = { data: [] }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    const itemsRef = firebase.database().ref(`choices/${this.props.optionIndex}`);
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) { // eslint-disable-line
        newState.push(items[item]);
      }
      this.setState({ data: newState });
    });
  }

  render() {
    const { colors, handleSeeStats } = this.props;
    const { data } = this.state;
    console.log('data', data);
    const sum = data.reduce((carry, current) => carry + current, 0);
    let startAngle = 0;
    return (
      <div className="stats-wrapper" onClick={handleSeeStats} role="button" tabIndex={0}>
        <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} xmlns="http://www.w3.org/2000/svg" version="1.1">
          {data.map((slice, sliceIndex) => {
            const nextAngle = startAngle;
            const angle = (slice / sum) * 360;
            const percent = (slice / sum) * 100;
            startAngle += angle;
            return (
              <Slice
                key={sliceIndex}
                value={slice}
                percentValue={percent.toFixed(1)}
                startAngle={nextAngle}
                angle={angle}
                radius={radius}
                fill={colors[sliceIndex % colors.length]}
              />
            );
          })}
        </svg>
      </div>
    );
  }
}
