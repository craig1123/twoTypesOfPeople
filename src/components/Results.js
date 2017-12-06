import React, { Component } from 'react';
import './balloons.css';

export default class Results extends Component {

  componentDidMount() {
    console.log(this.balloonsContainer);
    const balloons = this.balloonsContainer.childNodes;

    for (var i = 0; i < balloons.length; i++) {
      var balloon = balloons[i];
      balloon.addEventListener('click', pop, false);
    }

    function pop(e) {
      e.target.style.display = "none";
      e.preventDefault();
      e.stopPropagation();
    }
  }

    render() {
      const { choices } = this.props;
        return (
            <section className="intro">
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1>Your Choices! Congrats</h1>
                        <ul>
                            {choices.map((val, i) =>
                                <li key={i} style={styles.item}>{val}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <section ref={(ref) => { this.balloonsContainer = ref }}>
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
}
