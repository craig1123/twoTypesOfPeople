import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './redux/actions';
import Questions from './components/quiz/Questions';
import PageShell from './components/PageShell';
import Landing from './components/landing/Landing';
import Results from './components/results/Results';
// import firebase from './config/firebase.js';

class App extends Component {
  componentDidMount() {
    this.getAllChoices();
    // this.getLocation();
  }

  getAllChoices = () => {
    // const itemsRef = firebase.database().ref('choices');
    // itemsRef.on('value', (snapshot) => {
    //   const items = snapshot.val();
    //   console.log(items);
    //   const newState = [];
    //   for (const item in items) { // eslint-disable-line
    //     newState.push(items[item]);
    //   }
    // });
  }

  // getLocation = async () => {
  //   await fetch('https://freegeoip.net/json/')
  //     .then(response => response.json())
  //     .then((location) => {
  //       if (location.country_code === 'US' && location.region_name) {
  //         // this.props.updateState({ key: 'USState', value: location.region_name });
  //       }
  //       if (location.country_name) {
  //         // this.props.updateState({ key: 'country', value: location.country_name });
  //       }
  //     });
  // }

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
