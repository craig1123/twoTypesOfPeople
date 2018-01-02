import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { updateState } from './../../redux/actions';
import RadioGroup from './../RadioGroup';
import Select from './../Select';

const genderOptions = [
  {
    name: 'Male',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <title>Icon Male</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Guy" stroke="#00171F" strokeWidth="2">
            <path d="M50,89 C28.4608948,89 11,71.5391052 11,50 C11,28.702089 28.8012779,11 50,11 C71.3811739,11 89,28.8647602 89,50 C89,71.5391052 71.5391052,89 50,89 Z" id="Oval" />
            <path d="M34.5,59 C32.0147186,59 30,56.9852814 30,54.5 C30,53.1996039 30.5532818,51.9907899 31.5049437,51.1414086 C32.3241732,50.4102265 33.3788668,50 34.5,50 C36.9852814,50 39,52.0147186 39,54.5 C39,56.9852814 36.9852814,59 34.5,59 Z" id="eye" />
            <path d="M65,59 C62.790861,59 61,57.209139 61,55 C61,53.844 61.4917357,52.7696523 62.3377558,52.0145589 C63.0660084,51.3645758 64.0033341,51 65,51 C67.209139,51 69,52.790861 69,55 C69,57.209139 67.209139,59 65,59 Z" id="eye" />
            <path d="M13,39 C13,39 18.3404984,39.6508711 28,35 C37.6595016,30.3491289 40,26 40,26 C40,26 50.99493,36.4771587 58,38 C65.00507,39.5228413 75,42 86,36" id="Path-9" />
            <path d="M40.0417765,73.6204199 C43.0857241,74.4024099 46.5428621,75 50,75 C53.4660267,75 57.0521869,74.3993329 60.2588177,73.6143844" id="Path-8" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    name: 'Female',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <title>Icon Female</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Female" stroke="#00171F" strokeWidth="2">
            <path d="M34.5,59 C32.0147186,59 30,56.9852814 30,54.5 C30,53.1996039 30.5532818,51.9907899 31.5049437,51.1414086 C32.3241732,50.4102265 33.3788668,50 34.5,50 C36.9852814,50 39,52.0147186 39,54.5 C39,56.9852814 36.9852814,59 34.5,59 Z" id="eye" />
            <path d="M65,59 C62.790861,59 61,57.209139 61,55 C61,53.844 61.4917357,52.7696523 62.3377558,52.0145589 C63.0660084,51.3645758 64.0033341,51 65,51 C67.209139,51 69,52.790861 69,55 C69,57.209139 67.209139,59 65,59 Z" id="eye" />
            <path d="M40.0417765,73.6204199 C43.0857241,74.4024099 46.5428621,75 50,75 C53.4660267,75 57.0521869,74.3993329 60.2588177,73.6143844" id="Path-8" />
            <path d="M89,85.7475102 C88.8955878,85.9344664 88.7467384,86.1876581 88.5568273,86.4896509 C88.099056,87.2175897 87.5756991,87.9455147 86.9988116,88.620918 C86.4739467,89.2354147 85.9304177,89.775041 85.375305,90.2191312 C84.8658937,90.6266602 84.2662576,91.0180436 83.595144,91.3893912 C82.7730663,91.8442719 81.887807,92.2460964 81,92.5896591 L81,40 L81,38.8469903 L79.8585786,39.0100505 C79.6614656,39.0382095 79.2577272,39.0826578 78.6591173,39.1278359 C74.3930423,39.4498038 68.7942651,39.2189264 62.1788854,38.0161301 C57.0399578,37.0817796 52.3111466,34.9372575 48.0532571,31.9450012 C45.9977761,30.5005001 44.1879399,28.9525501 42.6417908,27.4063877 C42.1025143,26.8671065 41.6354717,26.3675518 41.2428426,25.9209461 C41.0110166,25.65725 40.857774,25.472798 40.7852536,25.3808257 L40.0214746,24.4121805 L39.2317787,25.3598156 C39.1671043,25.4374249 39.0389509,25.5878658 38.8531645,25.8006757 C38.5410991,26.1581324 38.1830018,26.5571551 37.7847578,26.9872586 C36.6466602,28.2164041 35.4176003,29.445464 34.1458501,30.5900392 C32.5231664,32.0504545 30.951344,33.2630032 29.4855042,34.1425071 C29.0304384,34.4155466 28.5310795,34.7026476 27.9916336,35.002074 C27.4450358,35.3054703 26.8605908,35.6196896 26.2435123,35.9426764 C24.8349714,36.6799246 23.3234177,37.4285751 21.8115464,38.1490329 C21.2821626,38.4013022 20.7906968,38.6319577 20.3498881,38.8361138 C20.0860774,38.958295 19.8982917,39.04426 19.7992478,39.0891363 L19.211955,39.3552353 L19.211955,40 L19.211955,92.7152178 C19.1364886,92.6917076 19.0597241,92.667071 18.9817486,92.6412798 C17.9021752,92.2841999 16.8226398,91.7852694 15.8208322,91.1247895 C15.4101539,90.8540341 15.0203834,90.5606598 14.6544853,90.2439252 C14.1170024,89.7786609 13.5401931,89.1607001 12.9460031,88.4291975 C12.4227493,87.7850238 11.9163214,87.0910824 11.4478335,86.3968037 C11.2837801,86.1536836 11.1364341,85.928256 11.0082743,85.7265874 C11.0054836,85.7221962 11.0027255,85.7178532 11,85.713559 C11,85.0832089 11,84.7118308 11,81.6747405 C11,77.349481 11,77.349481 11,72.1591696 C11,71.5103806 11,71.5103806 11,70.8632812 C11,64.359375 11,64.359375 11,60 C11,52.5915787 11.1864157,47.4651466 11.4954955,44.2198091 C11.6016611,43.1050696 11.7139336,42.3079355 11.8230104,41.7807306 C11.8772398,41.5186217 11.907738,41.4205921 11.8944272,41.4472136 L11.8944272,41.4472136 L11.9531333,41.3298014 L11.979547,41.2012154 C11.9897736,41.151431 12.0134457,41.0449892 12.0517573,40.8856927 C12.1171311,40.6138739 12.199539,40.2967548 12.3001685,39.9381396 C12.5895905,38.9067215 12.9661965,37.7545848 13.4393808,36.5121684 C14.7929142,32.9582632 16.645561,29.4037594 19.0699875,26.0905275 C25.9786458,16.6491245 36.058878,11 50,11 C63.9680262,11 73.8677356,15.9210538 80.4573453,24.1261723 C82.7631629,26.9972841 84.4914427,30.0758538 85.7229878,33.1528363 C86.1530722,34.2273906 86.4899505,35.2232906 86.743943,36.1140543 C86.8941528,36.6408474 86.9824164,37.0099991 87.0191959,37.1949955 C87.0506645,37.3173809 87.0767576,37.4156648 87.1148011,37.570556 C87.1802255,37.836927 87.25369,38.161866 87.3332396,38.5463556 C87.562761,39.6557092 87.7931539,41.0150273 88.0087721,42.6321637 C88.6278466,47.2752226 89,53.0436001 89,60 L89,85.7475102 Z" id="Path-9" />
            <path d="M19,75 C19,75 30,90 50,90 C70,90 81,75 81,75" id="Path-10" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    name: 'Other',
    svg: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <title>Icon Other</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="other" stroke="#00171F" strokeWidth="2">
            <path d="M50,89 C28.4608948,89 11,71.5391052 11,50 C11,28.702089 28.8012779,11 50,11 C71.3811739,11 89,28.8647602 89,50 C89,71.5391052 71.5391052,89 50,89 Z" id="Oval" />
            <path d="M34.5,59 C32.0147186,59 30,56.9852814 30,54.5 C30,53.1996039 30.5532818,51.9907899 31.5049437,51.1414086 C32.3241732,50.4102265 33.3788668,50 34.5,50 C36.9852814,50 39,52.0147186 39,54.5 C39,56.9852814 36.9852814,59 34.5,59 Z" id="eye" />
            <path d="M65,59 C62.790861,59 61,57.209139 61,55 C61,53.844 61.4917357,52.7696523 62.3377558,52.0145589 C63.0660084,51.3645758 64.0033341,51 65,51 C67.209139,51 69,52.790861 69,55 C69,57.209139 67.209139,59 65,59 Z" id="eye" />
            <path d="M40.0417765,73.6204199 C43.0857241,74.4024099 46.5428621,75 50,75 C53.4660267,75 57.0521869,74.3993329 60.2588177,73.6143844" id="Path-8" />
          </g>
        </g>
      </svg>
    ),
  },
];
const ageGroupOptions = ['0-17', '18-26', '27-35', '36-50', '51-64', '65+'];

class Landing extends Component {
  componentDidMount() {
    const threeStyle = this.three.style;
    const aElem = document.getElementById('start-quiz');
    const boundingClientRect = aElem.getBoundingClientRect();

    aElem.onmousemove = (e) => {
      const x = e.clientX - boundingClientRect.left;
      const y = e.clientY - boundingClientRect.top;
      const xc = boundingClientRect.width / 2;
      const yc = boundingClientRect.height / 2;
      const dx = (x - xc) / 2;
      const dy = (y - yc) * -1.5;
      threeStyle.setProperty('--rx', `${dy}deg`);
      threeStyle.setProperty('--ry', `${dx}deg`);
    };
    aElem.onmouseleave = () => {
      threeStyle.setProperty('--ty', '0');
      threeStyle.setProperty('--rx', '0');
      threeStyle.setProperty('--ry', '0');
    };
    aElem.onmousedown = () => {
      threeStyle.setProperty('--tz', '-25px');
    };
    this.three.onmouseup = () => {
      threeStyle.setProperty('--tz', '-12px');
    };
  }

  handleGender = value => () => {
    localStorage.setItem('gender', value);
    this.props.updateState({ key: 'gender', value });
  }

  handleAgeGroup = (e) => {
    localStorage.setItem('ageGroup', e.target.value);
    this.props.updateState({ key: 'ageGroup', value: e.target.value });
  }

  render() {
    return (
      <section className="landing-wrapper">
        <h1>Two Types of People</h1>
        <p className="">
          There are many different types of people and personalities
          in this world. However, it's sometimes easiest to divide us
          into two specific groups. Find out your personality type as
          you take this simple and fun quiz.
        </p>
        <form className="landing-form">
          <RadioGroup
            options={genderOptions}
            question="What is your gender?"
            setName="gender"
            setValue={this.props.gender}
            handleFunc={this.handleGender}
          />
          <legend className="form-question">What is your age range?</legend>
          <Select
            name="ageRange"
            placeholder="Select your age range"
            controlFunc={this.handleAgeGroup}
            options={ageGroupOptions}
            selectedOption={this.props.ageGroup}
          />
        </form>
        <div className="three-d" ref={(ref) => { this.three = ref; }}>
          <Link to={`/quiz/${this.props.optionIndex || 0}`} id="start-quiz" data-title="Take Quiz" />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  gender: state.gender,
  ageGroup: state.ageGroup,
  optionIndex: state.optionIndex,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
