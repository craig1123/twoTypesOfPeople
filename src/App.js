import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import firebase, { auth, googleProvider } from './firebase.js';
import Questions from "./components/Questions";
import Landing from "./components/Landing";
import Header from "./components/Header";

class App extends Component {
    state = { user: null }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        // const itemsRef = firebase.database().ref('items');
        // itemsRef.on('value', (snapshot) => {
        //     let items = snapshot.val();
        //     let newState = [];
        //     for (let item in items) {
        //         newState.push({
        //             id: item,
        //             title: items[item].title,
        //             user: items[item].user
        //         });
        //     }
        //     this.setState({ items: newState });
        // });
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
            <div>
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
