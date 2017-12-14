import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Questions from './components/quiz/Questions';
import Landing from './components/landing/Landing';
import Results from './components/results/Results';

class App extends Component {
  componentDidMount() {
    document.getElementById('yinyang').style.display = 'none';
  }

  render() {
    return (
      <Switch>
        <Route exact path="/quiz/:optionIndex" component={Questions} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }
}

export default App;
