import React, { Component } from 'react';
import './balloons.css';

export default class Results extends Component {

  componentDidMount() {
    localStorage.setItem('choices', this.props.choices);
    const balloonsContainer = document.getElementById("balloons-container"),
      intro = document.getElementById("intro"),
      balloons = balloonsContainer.childNodes;

    for (var i = 0; i < balloons.length; i++) {
      var balloon = balloons[i];
      balloon.addEventListener('click', pop, false);
    }

    function pop(e) {
      var element = e.target;
      if (element.classList.contains('yellow')) {
          intro.style.background = 'rgb(235,255,20)';
      }
      else if (element.classList.contains('blue')) {
          intro.style.background = 'rgb(39,20,255)';
      }
       else if (element.classList.contains('purple')) {
           intro.style.background = 'rgb(189,96,255)';
      }
      else if (element.classList.contains('red')) {
          intro.style.background = 'rgb(255,39,20)';
      }
      else if (element.classList.contains('cyan')) {
            intro.style.background = 'rgb(20,235,255)';
      }
        else if (element.classList.contains('pink')) {
            intro.style.background = 'rgb(255,138,187)';
      }
        else if (element.classList.contains('green')) {
            intro.style.background = 'rgb(20,189,34)';
      }
        else if (element.classList.contains('orange')) {
            intro.style.background = 'rgb(255,171,53)';
      }
      element.style.display = "none";
      e.preventDefault();
      e.stopPropagation();
    }
  }

    render() {
      const { choices } = this.props;
        return (
            <section className="intro" id="intro">
              <div style={styles.container}>
                <div style={styles.header}>
                  <h1>Your Choices! Congrats</h1>
                  <ul>
                    {choices.map((val, i) => <li key={i} style={styles.item}>{val}</li>)}
                  </ul>
                </div>
              </div>
                <section className="balloons-conatiner" id="balloons-container">
                    <div className="balloon yellow" />
                    <div className="balloon blue"   />
                    <div className="balloon purple" />
                    <div className="balloon red"    />
                    <div className="balloon cyan"   />
                    <div className="balloon pink"   />
                    <div className="balloon orange" />
                    <div className="balloon blue"   />
                    <div className="balloon yellow" />
                    <div className="balloon purple" />
                    <div className="balloon green"  />
                    <div className="balloon cyan"   />
                    <div className="balloon red"    />
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
}
