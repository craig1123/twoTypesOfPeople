import React, { Component } from 'react';
import firebase, { auth, googleProvider } from './../firebase.js';

export default class Landing extends Component {
    state = { items: [] }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }

    handleSubmit = () => {
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.currentItem,
            user: this.state.username
        }
        itemsRef.push(item);
    }

    render() {
        return (
            <div>
                landing
            </div>
        );
    }
}
