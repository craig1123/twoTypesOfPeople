import React, { Component } from 'react';
import Results from './Results';
import options from './../options';

export default class Questions extends Component {
    state = { index: 0, choices: [] }

    componentDidMount() {
      document.addEventListener('keyPress', (e) => {
        const item = options[this.state.index];
        if (e.key === 'arrowLeft') {
          this.clickItem('one', item.options[0])();
        } else if (e.key === 'arrowRight') {
          this.clickItem('two', item.options[1])();
        }
      });
    }

    clickItem = (ref, opt) => () => {
      const el = this[ref];
      el.classList.add('big');
      this.recordItem(opt);
      setTimeout(() => {
        // document.body.style.background = next;
        el.classList.remove('big');
        this.setState(prev => ({ index: prev.index + 1 }));
      }, 500);
    }

    recordItem = (opt) => {
      const choices = this.state.choices.concat(opt);
      this.setState({ choices });
    }

    render() {
      const { index, choices } = this.state;
      const item = options[index];
      if (index > options.length - 1) {
        return <Results choices={choices} />;
      }
      return (
        <section>
          <div
            role="presentation"
            ref={(ref) => { this.one = ref; }}
            className="small-one"
            onClick={this.clickItem('one', item.options[0])}
          >
            <img alt="item 1" src={item[0]} />
          </div>
          <div
            role="presentation"
            ref={(ref) => { this.two = ref; }}
            className="small-two"
            onClick={this.clickItem('two', item.options[1])}
          >
            <img alt="item 2" src={item[1]} />
          </div>
        </section>
      );
    }
}
