import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
// import { auth, googleProvider } from './firebase.js';
import Questions from './components/Questions';
import Landing from './components/Landing';
import Header from './components/Header';

class App extends Component {
    state = { user: null, optionIndex: 0, startQuiz: false }

    componentDidMount() {
      document.getElementById('yinyang').style.display = 'none';
    }

    updateOptionIndex = () => {
      // setTimeout(() => {
      // document.body.style.background = next;
      // el.classList.remove('big');
      this.setState(prev => ({ optionIndex: prev.optionIndex + 1 }));
      // }, 500);
    }

    handleStartQuiz = () => {
      this.setState({ startQuiz: true });
    }
    handleEndQuiz = () => {
      this.setState({ startQuiz: false });
    }

    render() {
      const { user, optionIndex, startQuiz } = this.state;
      return (
        <div className="wrapper">
          <Header
            user={user}
            optionIndex={optionIndex}
            startQuiz={startQuiz}
            handleEndQuiz={this.handleEndQuiz}
          />
          <Switch>
            <Route
              exact
              path="/quiz"
              render={() =>
                (<Questions
                  optionIndex={optionIndex}
                  updateOptionIndex={this.updateOptionIndex}
                  handleStartQuiz={this.handleStartQuiz}
                />)}
            />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      );
    }
}

export default App;
