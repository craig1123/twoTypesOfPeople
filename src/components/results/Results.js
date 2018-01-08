import React, { Component } from 'react';
import { Radar, PolarRadiusAxis, PolarAngleAxis, PolarGrid, RadarChart, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux';
import { updateState, updateMultiple } from './../../redux/actions';
import firebase from './../../config/firebase.js';
import objectToArray from './../../utils/objectToArray.js';
import mobileWidth from './../../utils/mobileWidth.js';
import { lightBlue, orange, green, yellow, purple, black, blue } from './../../config/colorScheme.js';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const radarData = [
  { subject: 'Math', A: 120, fullMark: 150 },
  { subject: 'English', A: 86, fullMark: 150 },
  { subject: 'Reading', A: 55, fullMark: 150 },
  { subject: 'Geography', A: 99, fullMark: 150 },
  { subject: 'Physics', A: 85, fullMark: 150 }];


const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }];

const myColors = [lightBlue, orange, green, purple, yellow];

class Results extends Component {
  constructor(props) {
    super(props);
    const score = props.choices.reduce((a, b) => a + b, 0);
    this.state = { score };
  }
  componentDidMount() {
    // this.getAllChoices();
  }

  getAllChoices = () => {
    const itemsRef = firebase.database().ref('choices');
    itemsRef.on('value', (snapshot) => {
      const allData = objectToArray(snapshot.val());
      this.props.updateState({ key: 'allData', value: allData });
    });
  }

  render() {
    const { score } = this.state;
    return (
      <section>
        <div style={styles.header}>
          <h1 className="">Results</h1>
        </div>
        <h2>Your score: {score}</h2>
        <BarChart
          width={mobileWidth ? 400 : 600}
          height={350}
          data={data}
          margin={{
           top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke={black} />
          <YAxis yAxisId="right" orientation="right" stroke={blue} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="pv" fill={black} />
          <Bar yAxisId="right" dataKey="uv" fill={blue} />
        </BarChart>

        <PieChart width={800} height={400}>
          <Pie data={data01} dataKey="value">
            {data01.map((entry, index) => <Cell key={`cell-${index}`} fill={myColors[index]} />)}
          </Pie>
          <Tooltip />
        </PieChart>

        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke={green} fill={green} fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  allData: state.allData,
  choices: state.choices,
});

const mapDispatchToProps = dispatch => ({
  updateState: change => dispatch(updateState(change)),
  updateMultiple: changes => dispatch(updateMultiple(changes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);

const styles = {
  header: {
    listStyleType: 'none',
    textAlign: 'center',
    fontSize: '25px',
    width: '100%',
    marginRight: '100px',
  },
};
