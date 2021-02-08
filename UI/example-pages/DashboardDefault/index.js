import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';
import DashboardDefaultSection2 from '../../example-components/DashboardDefault/DashboardDefaultSection2';
import Button from '@material-ui/core/Button';
import { Chart } from 'react-google-charts';
import CanvasJSReact from '../canvasjs-3.2.3/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function DashboardDefault() {
  var initial_options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'dark2', // "light1", "light2", "dark1", "dark2"
    title: {
      text: 'Surface Temperature vs Size & Distance of Planets from Sun',
      fontSize: 26
    },
    axisX: {
      title: 'Distance From Sun (in Million Miles)',
      logarithmic: true
    },
    axisY: {
      title: 'Surface Temp (in Kelvin)'
    },
    data: [
      {
        type: 'bubble',
        indexLabel: '{label}',
        toolTipContent:
          '<b>{label}</b><br>Distance From Sun: {x}mn miles<br>Avg. Surface Temp: {y} Kelvin<br>Diameter: {z} miles',
        dataPoints: [
          { label: 'Mercury', x: 36, y: 452, z: 3031 },
          { label: 'Venus', x: 67.2, y: 726, z: 7521 },
          { label: 'Earth', x: 93, y: 285, z: 7926 },
          { label: 'Mars', x: 141.6, y: 230, z: 4222 },
          { label: 'Jupiter', x: 483.6, y: 120, z: 88729 },
          { label: 'Saturn', x: 886.7, y: 88, z: 74600 },
          { label: 'Uranus', x: 1784.0, y: 59, z: 32600 },
          { label: 'Neptune', x: 2794.4, y: 48, z: 30200 }
        ]
      }
    ]
  };
  var updated_options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light1', // "light1", "light2", "dark1", "dark2"
    title: {
      text: 'changed',
      fontSize: 26
    },
    axisX: {
      title: 'Distance From Sun (in Million Miles)',
      logarithmic: true
    },
    axisY: {
      title: 'Surface Temp (in Kelvin)'
    },
    data: [
      {
        type: 'bubble',
        indexLabel: '{label}',
        toolTipContent:
          '<b>{label}</b><br>Distance From Sun: {x}mn miles<br>Avg. Surface Temp: {y} Kelvin<br>Diameter: {z} miles',
        dataPoints: [
          { label: 'Mercury', x: 16, y: 452, z: 3301 },
          { label: 'Venus', x: 167.2, y: 726, z: 521 },
          { label: 'Earth', x: 73, y: 285, z: 796 },
          { label: 'Mars', x: 131.6, y: 230, z: 222 },
          { label: 'Jupiter', x: 1483.6, y: 120, z: 8729 },
          { label: 'Saturn', x: 86.7, y: 88, z: 7460 },
          { label: 'Uranus', x: 784.0, y: 59, z: 3600 },
          { label: 'Neptune', x: 794.4, y: 48, z: 200 }
        ]
      }
    ]
  };
  const [options, setOptions] = React.useState(initial_options);
  var test_value = 'before';
  var test_value1 = 'before';
  var datapoints = [
    ['ID', 'X', 'Y', 'Topic', 'Freq'],
    ['Topic1', 0.1, 0.7, 'Topic1', 1],
    ['Topic2', 0.5, 0.2, 'Topic2', 2],
    ['Topic3', 0.9, 0.9, 'Topic3', 3]
  ];
  var datapoints1 = [
    ['ID', 'X', 'Y', 'Topic', 'Freq'],
    ['Topic1', 0.3, 0.5, 'Topic1', 3],
    ['Topic2', 0.2, 0.5, 'Topic2', 2],
    ['Topic3', 0.1, 0.1, 'Topic3', 1]
  ];
  function onClickTopic() {
    datapoints = datapoints1;
  }

  function onClickTopic() {
    datapoints = datapoints1;
    ReactDOM.render(
      '<Chart className="chart" id="chart" width="700px" height="500px" chartType="BubbleChart" loader={<div>Loading Chart</div>} data={datapoints} options={{ title: "LDA Topic Cluster", bubble: { textStyle: { fontSize: 11, color: "white" } }, backgroundColor: "transparent", legend: { position: "bottom",color: "white", textStyle: { color: "white" }}}} rootProps={{ "data-testid": "1" }} chartEvents={onClickTopic}/>',
      document.getElementById('outside_chart_div')
    );
  }

  function test_click() {
    test_value = 'after';
  }
  function test_click1() {
    ReactDOM.render('after', document.getElementById('test_text1'));
    changeOptions();
  }
  function changeOptions() {
    setOptions(updated_options);
  }
  function onClickChart() {
    // console.log('chart is clicked');
    changeOptions();
    // initial_options = updated_options;
    // console.log('updated_options : ', updated_options);
    // console.log('updated_options_changed? : ', options);
  }
  return (
    // todo : home에서 설명 삽입가능
    <Fragment>
      {/*<PageTitle*/}
      {/*  titleHeading="Hot Topic Extractor"*/}
      {/*  titleDescription="This is a webpage for analyzing topic."*/}
      {/*/>*/}
      <DashboardDefaultSection1 />
      <DashboardDefaultSection2 />
      {/*<DashboardDefaultSection3 />*/}
      {/*<DashboardDefaultSection4 />*/}
      <Button
        id="test"
        variant="contained"
        color="secondary"
        onClick={test_click}
        value={test_value}>
        <b id="test_text">{test_value} </b>
      </Button>
      <Button
        id="test1"
        variant="contained"
        color="secondary"
        onClick={test_click1}
        value={test_value1}>
        <b id="test_text1">{test_value1} </b>
      </Button>
      <div id="outside_chart_div">
        <Chart
          className="chart"
          id="chart"
          width={'700px'}
          height={'500px'}
          chartType="BubbleChart"
          loader={<div>Loading Chart</div>}
          data={datapoints}
          options={{
            title: 'LDA Topic Cluster',
            bubble: { textStyle: { fontSize: 11, color: 'white' } },
            backgroundColor: 'transparent',
            legend: {
              position: 'bottom',
              color: 'white',
              textStyle: { color: 'white' }
            }
          }}
          rootProps={{ 'data-testid': '1' }}
          chartEvents={onClickTopic}
        />
      </div>
      {/*<div>*/}
      {/*  <BubbleChart options={options} onClick={onClickChart}></BubbleChart>*/}
      {/*</div>*/}
      <div>
        <h1>React Bubble Chart</h1>
        <CanvasJSChart
          options={options}
          onClick={onClickChart}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
    </Fragment>
  );
}
