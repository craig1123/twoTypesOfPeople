import React, { Component } from 'react';
import Slice from './Slice';

const data = [26, 11];
const colors = ['#7B43A1', '#43A19E'];
const colorsLength = colors.length;
const radius = 150;
const diameter = radius * 2;

export default class Stats extends Component {
  state = {}
  render() {
    const sum = data.reduce((carry, current) => carry + current, 0);
    let startAngle = 0;
    return (
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
              fill={colors[sliceIndex % colorsLength]}
            />
          );
        })}
      </svg>
    );
  }
}
