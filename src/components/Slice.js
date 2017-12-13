import React, { Component } from 'react';

const getAnglePoint = (startAngle, endAngle, radius, x, y) => ({
  x1: x + (radius * Math.cos((Math.PI * startAngle) / 180)),
  y1: y + (radius * Math.sin((Math.PI * startAngle) / 180)),
  x2: x + (radius * Math.cos((Math.PI * endAngle) / 180)),
  y2: y + (radius * Math.sin((Math.PI * endAngle) / 180)),
});

export default class Slice extends Component {
  state = { path: '', x: 0, y: 0 }

  componentDidMount() {
    this.animate();
  }

  componentWillReceiveProps() {
    this.setState({ path: '' });
    this.animate();
  }

  animate = () => {
    this.draw(0);
  }

  draw = (initialAngle) => {
    const { angle, startAngle, radius } = this.props;
    const path = [];
    const step = angle / 18.75;
    if (initialAngle + step > angle) {
      initialAngle = angle; // eslint-disable-line
    }

    // Get angle points
    const a = getAnglePoint(startAngle, startAngle + initialAngle, radius, radius, radius);
    const b = getAnglePoint(startAngle, startAngle + initialAngle, radius - radius, radius, radius);

    path.push(`M${a.x1},${a.y1}`);
    path.push(`A${radius},${radius} 0 ${initialAngle > 180 ? 1 : 0},1 ${a.x2},${a.y2}`);
    path.push(`L${b.x2},${b.y2}`);
    path.push(`A${radius - radius},${radius - radius} 0 ${initialAngle > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);
    path.push('Z'); // path close
    this.setState({ path: path.join(' ') });

    if (initialAngle < angle) {
      setTimeout(() => { this.draw(initialAngle + step); }, 16);
    } else {
      const newRadius = (radius / 2);
      const c = getAnglePoint(startAngle, startAngle + (angle / 2), newRadius, radius, radius);
      this.setState({ x: c.x2, y: c.y2 });
    }
  }

  render() {
    const { fill, percentValue } = this.props;
    const { path, x, y } = this.state;
    return (
      <g overflow="hidden">
        <path d={path} fill={fill} stroke="#fff" strokeWidth={1} />
        {percentValue > 5 && <text x={x} y={y} fill="#fff" textAnchor="middle">{percentValue}%</text>}
      </g>
    );
  }
}
