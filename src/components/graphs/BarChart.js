import React, { Component } from 'react';
import calculateBarChartState from './../../utils/calculateBarChartState';

class BarChart extends Component {
  constructor(props) {
    super(props);
    const {
      bars, labelWidth, showLabels, width,
    } = props;
    this.state = calculateBarChartState({
      bars, labelWidth, showLabels, width,
    });
  }
  componentWillReceiveProps({
    bars, labelWidth, showLabels, width,
  }) {
    const { bars: nextBars, ...state } = calculateBarChartState({
      bars, labelWidth, showLabels, width,
    });
    this.setState(state);
  }

  render() {
    const {
      height, width, barSpacing, bars, labelWidth, preserveAspectRatio, formatValue, showLabels, labelSpacing, valueSpacing,
    } = this.props;
    const barHeight = (height - barSpacing * (bars.length + 1)) / bars.length;
    const x = showLabels ? -labelWidth : 0;

    return (
      <svg
        aria-describedby="bar-chart-description"
        aria-labelledby="bar-chart-title"
        className="bar-chart"
        preserveAspectRatio={preserveAspectRatio}
        role="img"
        height={height}
        width={width}
        version="1.1"
        viewBox={`${x} 0 ${width} ${height}`}
      >
        <title id="bar-chart-title">Bar chart</title>

        {this.state.bars.map((bar, i) => {
          const barY = (barHeight + this.props.barSpacing) * i + barSpacing;
          const textY = barY + barHeight / 2;
          const value = bars[i].value;
          const formattedValue = formatValue(value);
          const valueInBar = bar.value > this.state.x / 2;

          return (
            <g
              className={`bar-chart__group${bar.label ? `bar-chart__group--${bar.label}` : ''}`}
              key={i}
            >
              <rect
                aria-describedby={`bar-chart-value-${bar.label}`}
                aria-labelledby={`bar-chart-label-${bar.label}`}
                className="bar-chart__bar"
                height={barHeight}
                width={bar.value}
                x={0}
                y={barY}
              />
              {showLabels ?
                <text
                  className="bar-chart__label"
                  dominantBaseline="middle"
                  id={`bar-chart-label-${bar.label}`}
                  textAnchor="end"
                  x={-labelSpacing}
                  y={textY}
                >
                  {bar.label}
                </text>
                :
                <title id={`bar-chart-label-${bar.label}`}>{bar.label}</title>
              }
              <text
                className="bar-chart__value"
                dominantBaseline="middle"
                fill={valueInBar ? 'rgb( 255, 255, 255 )' : 'rgb( 0, 0, 0 )'}
                id={`bar-chart-value-${bar.label}`}
                textAnchor={valueInBar ? 'end' : 'start'}
                x={bar.value + (valueInBar ? -valueSpacing : valueSpacing)}
                y={textY}
              >
                {formattedValue}
              </text>
            </g>
          );
        })}
        <g className="bar-chart__grid-x">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2={this.state.x}
            y1={height}
            y2={height}
          />
        </g>
        <g className="bar-chart__grid-y">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2="0"
            y1="0"
            y2={height}
          />
        </g>
      </svg>
    );
  }
}
BarChart.defaultProps = {
  barSpacing: 10,
  formatValue: v => v,
  height: 500,
  labelSpacing: 10,
  labelWidth: 100,
  preserveAspectRatio: 'xMidYMid meet',
  showLabels: true,
  valueSpacing: 10,
  width: 800,
};

export default BarChart;
