import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { auth, googleProvider } from './firebase.js';
import Questions from './components/Questions';
import Landing from './components/Landing';
import Header from './components/Header';

class App extends Component {
    state = { user: null }

    componentDidMount() {
      document.getElementById('yinyang').style.display = 'none';
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        }
      });
    }

    logout = () => {
      auth.signOut().then(() => {
        this.setState({ user: null });
      });
    }

    login = () => {
      auth.signInWithPopup(googleProvider).then((result) => {
        console.log('user', result);
        this.setState({ user: result.user });
      });
    }

    render() {
      return (
        <div className="wrapper">
          <Header user={this.state.user} logout={this.logout} login={this.login} />
          <Switch>
            <Route exact path="/quiz" component={Questions} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      );
    }
}

export default App;
