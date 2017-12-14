import React, { Component } from 'react';
import firebase from './../../config/firebase.js';

export default class Results extends Component {
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
      <section>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1>Points</h1>
            {choices}
          </div>
        </div>
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
