import React, { Component } from 'react';
import firebase from "./../firebase";
import Results  from './Results';
import options from './options';

export default class Questions extends Component {
    state = { index: 0, choices: [] }

    clickItem = (ref, opt) => () => {
        const el = this[ref];
        el.classList.add("big")
        this.recordItem(opt);
        setTimeout(() => {
            document.body.style.background = next;
            el.classList.remove("big");
            this.setState(prev => ({ index: prev.index + 1 }));
        }, 500);
    }

    recordItem = (opt) => {
        const choices = this.state.choices.concat(opt);
        this.setState({ choices })
    }

    getBackground = () => ({
        background: 'white'
    })


    render() {
        const { opposite, index, choices } = this.state;
        const item = options[index];
        const styles =
        if (index > options.length - 1) {
            return <Results choices={choices} />
        }
        return (
            <section>
                <div
                  ref={(ref) => { this.one = ref }}
                  className="small-one"
                  onClick={this.clickItem('one', item.options[0])}
                >
                    <img src={item[0]} />

                </div>
                <div
                  ref={(ref) => { this.two = ref }}
                  className="small-two"
                  onClick={this.clickItem('two', item.options[1])}
                >
                    <img src={item[1]} />
                </div>
            </section>
        );
    }
}
