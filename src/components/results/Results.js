import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './../../redux/actions';
import firebase from './../../config/firebase.js';
import objectToArray from './../../utils/objectToArray.js';
import mobileWidth from './../../utils/mobileWidth.js';
import BarChart from './../graphs/BarChart';

class Results extends Component {
  componentDidMount() {
    // this.getAllChoices();
  }

  getAllChoices = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const allData = objectToArray(snapshot.val());
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
          height={mobileWidth ? 400 : 300}
          width={mobileWidth ? 900 : 1600}
        />
        <Chart
          chartType="PieChart"
          data={[['Task', 'Hours per Day'], ['Work', 11], ['Eat', 2], ['Commute', 2], ['Watch TV', 2], ['Sleep', 7]]}
          options={{ title: 'My Daily Activities', pieHole: 0.4, is3D: true }}
          height="400px"
        />
        <Chart
          chartType="ColumnChart"
          data={[['Task', 'Hours per Day'], ['Work', 11], ['Eat', 2], ['Commute', 2], ['Watch TV', 2], ['Sleep', 7]]}
          options={{
            title: 'Motivation and Energy Level Throughout the Day',
            hAxis: {
              title: 'Time of Day',
              format: 'h:mm a',
              viewWindow: {
                min: [7, 30, 0],
                max: [17, 30, 0],
              },
            },
            vAxis: {
              title: 'Rating (scale of 1-10)',
            },
          }}
          width="50%"
          height="400px"
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
