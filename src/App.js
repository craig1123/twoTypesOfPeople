import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Questions from "./Questions";
import Landing from "./Landing";

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
              <Route exact path="/quiz" component={Questions} />
              <Route exact path="/" component={Landing} />
          </Switch>
      </div>
    );
  }
}

export default App;
