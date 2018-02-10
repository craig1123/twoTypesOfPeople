import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateState } from './../../redux/actions';
import options from './../../config/options';
import Loading from './../Loading';
import StartButton from './StartButton';
import Form from './Form';
import './landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    let startLink = `/quiz/${props.optionIndex}`;
    startLink = props.optionIndex < options.length ? startLink : '/results';
    this.state = { startLink, loaded: false };
  }

  endLoading = () => {
    this.props.updateState({ key: 'appLoading', value: false });
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 0);
  }

  render() {
    const { startLink, loaded } = this.state;
    const { appLoading } = this.props;
    if (appLoading) {
      return <Loading endLoading={this.endLoading} appLoading={appLoading} />;
    }
    return (
      <div>
        <section className="landing-wrapper">
          <div className="another-wrapper" style={loaded ? { opacity: 1 } : null}>
            <h1 className="yellow">Two Types of People</h1>
            <div className="flex-wrapper">
              <p>
                There are many different types of people and personalities
                in this world. However, it's sometimes easiest to divide us
                into two specific groups. Find out your personality type as
                you take this simple and fun quiz.
              </p>
              <div className="" />
            </div>
            <div className="flex-wrapper">
              <p>
                Portuguese art director Joao Rocha has created a
                fun <a href="http://2kindsofpeople.tumblr.com/" target="_blank" rel="noopener noreferrer">series</a> of
                minimalist illustrations that classifies people into two broad
                groups based on their daily habits and preferences.
              </p>
              <div className="" />
            </div>
          </div>
        </section>
        <Form />
        <StartButton startLink={startLink} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  optionIndex: state.optionIndex,
  appLoading: state.appLoading,
  gender: state.gender,
  ageGroup: state.ageGroup,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
