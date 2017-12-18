import React from 'react';
import { connect } from 'react-redux';
import Pie from './../graphs/Pie';
import objectToArray from './../../utils/objectToArray';

const ItemStats = ({
  colors, handleSeeStats, items, optionIndex,
}) => (
  <div className="stats-wrapper" onClick={handleSeeStats} role="button" tabIndex={0}>
    <Pie data={objectToArray(items[optionIndex].total)} colors={colors} />
  </div>
);

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps)(ItemStats);
