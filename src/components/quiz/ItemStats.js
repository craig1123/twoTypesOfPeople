import React, { Component } from 'react';
import firebase from './../../config/firebase.js';
import Pie from './../graphs/Pie';

export default class ItemStats extends Component {
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
    return (
      <div className="stats-wrapper" onClick={handleSeeStats} role="button" tabIndex={0}>
        <Pie data={data} colors={colors} />
      </div>
    );
  }
}
