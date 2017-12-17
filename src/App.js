import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './redux/actions';
import Questions from './components/quiz/Questions';
import PageShell from './components/PageShell';
import Landing from './components/landing/Landing';
import Results from './components/results/Results';
import firebase from './config/firebase.js';

class App extends Component {
  componentDidMount() {
    const USState = localStorage.getItem('USState');
    const gender = localStorage.getItem('gender');
    const ageGroup = localStorage.getItem('ageGroup');
    const localStates = [];
    if (gender) {
      localStates.push({ key: 'gender', value: gender });
    }
    if (ageGroup) {
      localStates.push({ key: 'ageGroup', value: ageGroup });
    }
    if (USState) {
      localStates.push({ key: 'USState', value: USState });
    }
    // else {
    //   this.getLocation();
    // }
    // this.getAllChoices();
    this.props.updateMultiple(localStates);
  }

  getAllChoices = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newItems = [];
      for (const item in items) { // eslint-disable-line
        newItems.push(items[item]);
      }
      this.props.updateState({ key: 'items', value: newItems });
    });
  }

  getLocation = async () => {
    await fetch('https://freegeoip.net/json/')
      .then(response => response.json())
      .then((location) => {
        const locations = [];
        if (location.country_code === 'US' && location.region_name) {
          locations.push({ key: 'country', value: location.region_name });
        }
        if (location.country_name) {
          locations.push({ key: 'country', value: location.country_name });
        }
        this.props.updateMultiple(locations);
      });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/quiz/:optionIndex" component={Questions} />
        <Route exact path="/results" component={PageShell(Results)} />
        <Route exact path="/" component={PageShell(Landing)} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
  updateMultiple: changes => dispatch(updateMultiple(changes)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
