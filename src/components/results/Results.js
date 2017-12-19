import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './../../redux/actions';
import firebase from './../../config/firebase.js';
import BarChart from './../graphs/BarChart';

class Results extends Component {
  componentDidMount() {
    // this.getAllChoices();
  }

  getAllChoices = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const allData = [];
      for (const item in items) { // eslint-disable-line
        allData.push(items[item]);
      }
      this.props.updateState({ key: 'allData', value: allData });
    });
  }

  render() {
    const { choices } = this.props;
    return (
      <section>
        <div style={styles.header}>
          <h1 className="">Test</h1>
        </div>
        {choices}
        <BarChart
          bars={[
            { label: 'travel', value: 11 },
            { label: 'accomodation', value: 27 },
            { label: 'food', value: 4 },
            { label: 'drink', value: 19 },
            { label: 'tourism', value: 10 },
          ]}
          labelWidth={135}
          preserveAspectRatio="xMinYMid meet"
          formatValue={v => `$${v.toFixed(2)}`}
          height={400}
          width={600}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  allData: state.allData,
  choices: state.choices,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
  updateMultiple: changes => dispatch(updateMultiple(changes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);

const styles = {
  header: {
    listStyleType: 'none',
    textAlign: 'center',
    fontSize: '25px',
    width: '100%',
    marginRight: '100px',
  },
};
