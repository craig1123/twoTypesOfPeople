import React, { Component } from 'react';
import firebase from './../firebase.js';
import './balloons.css';

export default class Results extends Component {
  componentDidMount() {
    const balloons = this.balloonsContainer.childNodes;
    for (let i = 0; i < balloons.length; i += 1) {
      const balloon = balloons[i];
      balloon.addEventListener('click', pop, false);
    }
    function pop(e) {
      e.target.style.display = 'none';
      e.preventDefault();
      e.stopPropagation();
    }
  }

  getItems = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) { // eslint-disable-line
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
        });
      }
      console.log(newState);
      // this.setState({ items: newState });
    });
  }

  render() {
    const { choices } = this.props;
    return (
      <section className="intro">
        <div style={styles.container}>
          <div style={styles.header}>
            <h1>Your Choices! Congrats</h1>
            {choices}
          </div>
        </div>
        <section ref={(ref) => { this.balloonsContainer = ref; }}>
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
          <div className="balloon" />
        </section>
      </section>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
  header: {
    listStyleType: 'none',
    textAlign: 'center',
    fontSize: '25px',
    width: '100%',
    marginRight: '100px',
  },
  item: {
    listStyleType: 'none',
  },
};
