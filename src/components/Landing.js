import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import firebase from './../firebase.js';

export default class Landing extends Component {
  componentDidMount() {
    const docStyle = this.three.style;
    const aElem = document.getElementById('start-quiz');
    const boundingClientRect = aElem.getBoundingClientRect();

    aElem.onmousemove = (e) => {
      const x = e.clientX - boundingClientRect.left;
      const y = e.clientY - boundingClientRect.top;
      const xc = boundingClientRect.width / 2;
      const yc = boundingClientRect.height / 2;
      const dx = (x - xc) / 2;
      const dy = (y - yc) * -1.5;
      docStyle.setProperty('--rx', `${dy}deg`);
      docStyle.setProperty('--ry', `${dx}deg`);
    };
    aElem.onmouseleave = () => {
      docStyle.setProperty('--ty', '0');
      docStyle.setProperty('--rx', '0');
      docStyle.setProperty('--ry', '0');
    };
    aElem.onmousedown = () => {
      docStyle.setProperty('--tz', '-25px');
    };
    this.three.onmouseup = () => {
      docStyle.setProperty('--tz', '-12px');
    };
  }

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
        {/* <h1>Two Types of People</h1>
        <p className="">
          There are many different types of people and personalities
          in this world. However, it's sometimes easiest to divide us
          into two specific groups. Find out your personality type as
          you take this simple and fun quiz.
        </p> */}
        <div className="three-d" ref={(ref) => { this.three = ref; }}>
          <Link to="/quiz/0" id="start-quiz" data-title="Take Quiz" />
        </div>
      </section>
    );
  }
}
