import React, { Component } from 'react';
import firebase from './../firebase.js';

export default class Landing extends Component {
    state = { items: [] };

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
        <div>
          <p className="">
            There are many different types of people and personalities
            in this world. However, it's sometimes easiest to divide us
            into two specific groups. Find out your personality type as
            you take this simple and fun quiz.
          </p>
        </div>
      );
    }
}
