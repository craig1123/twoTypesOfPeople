import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateState } from './../../redux/actions';
import options from './../../config/options';
import StartButton from './StartButton';
import Form from './Form';
import './landing.css';

class Landing extends Component {
  state = {}
  render() {
    const optionIndex = this.props.optionIndex || 0;
    let startLink = `/quiz/${optionIndex}`;
    startLink = optionIndex < options.length ? startLink : '/results';
    return (
      <section className="landing-wrapper">
        <h1>Two Types of People</h1>
        <p className="">
          There are many different types of people and personalities
          in this world. However, it's sometimes easiest to divide us
          into two specific groups. Find out your personality type as
          you take this simple and fun quiz.
        </p>
        <Form />
        <StartButton startLink={startLink} optionIndex={optionIndex} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  optionIndex: state.optionIndex,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
