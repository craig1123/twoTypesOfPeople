import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './redux/actions';
import Router from './components/Router';
import firebase from './config/firebase.js';
import objectToArray from './utils/objectToArray.js';

class App extends Component {
  componentDidMount() {
    const localStates = this.getLocalStates();
    this.props.updateMultiple(localStates);
    // this.getAllChoices;
  }

  getAllChoices = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const allData = objectToArray(snapshot.val());
      const localStates = this.getLocalStates();
      const multipleStates = [...localStates, { key: 'allData', value: allData }];
      this.props.updateMultiple(multipleStates);
    });
  }

  getLocalStates = () => {
    const USState = localStorage.getItem('USState');
    const gender = localStorage.getItem('gender');
    const ageGroup = localStorage.getItem('ageGroup');
    const choices = localStorage.getItem('choices');
    const optionIndex = localStorage.getItem('optionIndex');
    const localStates = [];
    if (gender) {
      localStates.push({ key: 'gender', value: gender });
    }
    if (ageGroup) {
      localStates.push({ key: 'ageGroup', value: ageGroup });
    }
    if (choices) {
      localStates.push({ key: 'choices', value: JSON.parse(choices) });
    }
    if (optionIndex) {
      localStates.push({ key: 'optionIndex', value: optionIndex });
    }
    if (USState) {
      localStates.push({ key: 'USState', value: USState });
    }
    // else {
    //   this.getLocation();
    // }
    return localStates;
  }

  getLocation = async () => {
    await fetch('https://freegeoip.net/json/')
      .then(response => response.json())
      .then((location) => {
        if (location.country_code === 'US' && location.region_name) {
          localStorage.setItem('USState', location.region_name);
          this.props.updateState({ key: 'USState', value: location.region_name });
        }
      });
  }

  render() {
    return (
      <Router />
    );
  }
}

const mapStateToProps = state => ({
  allData: state.allData,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
  updateMultiple: changes => dispatch(updateMultiple(changes)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
