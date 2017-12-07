import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import firebase from './../firebase.js';

export default class Landing extends Component {
  handleSubmit = () => {
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username,
    };
    itemsRef.push(item);
  };

  render() {
    return (
      <section className="landing-wrapper">
        <p className="">
          There are many different types of people and personalities
          in this world. However, it's sometimes easiest to divide us
          into two specific groups. Find out your personality type as
          you take this simple and fun quiz.
        </p>
        <Link to="/quiz">
          <button>Take the Quiz</button>
        </Link>
      </section>
    );
  }
}
