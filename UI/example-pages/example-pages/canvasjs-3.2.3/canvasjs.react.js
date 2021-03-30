var React = require('react');
var CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSChart extends React.Component {
  static _cjsContainerId = 0;
  constructor(props) {
    // console.log('constructor');
    super(props);
    this.options = props.options ? props.options : {};
    this.containerProps = props.containerProps
      ? props.containerProps
      : { width: '100%', position: 'relative' };
    this.containerProps.height =
      props.containerProps && props.containerProps.height
        ? props.containerProps.height
        : this.options.height
        ? this.options.height + 'px'
        : '400px';
    this.chartContainerId =
      'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++;
  }
  componentDidMount() {
    //Create Chart and Render
    // console.log('componentDidMount');

    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
    this.chart.render();

    if (this.props.onRef) this.props.onRef(this.chart);
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
    // console.log('componentWillReceiveProps: ', nextProps.options);
    // console.log(nextProps.options);
    this.setState(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate: ',!(nextProps.options === this.options));
    // console.log('prev : ', this.options);
    // console.log('next: ',nextProps.options);

    //Check if Chart-options has changed and determine if component has to be updated
    // return !(nextProps.options === this.options);
    return true;
  }
  componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {
    // console.log('');


  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    //Update Chart Options & Render
    this.chart.options = this.props.options;
    this.chart.render();
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount')
    //Destroy chart and remove reference
    this.chart.destroy();
    if (this.props.onRef) this.props.onRef(undefined);
  }



  render() {
    // return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });
    return <div id={this.chartContainerId} style={this.containerProps} onClick={this.onClick} />;
  }
}

var CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS
};

export default CanvasJSReact;
