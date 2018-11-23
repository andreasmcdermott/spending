import React from 'react';
import ChartJs from 'chart.js';

export default class Chart extends React.Component {
  canvasRef = React.createRef();
  chart = null;

  componentDidMount() {
    this.chart = new ChartJs(this.canvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: Object.values(this.props.data)
          }
        ],
        labels: Object.keys(this.props.data)
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <h3>
          {this.props.title}
        </h3>
        <canvas ref={this.canvasRef} />
      </React.Fragment>
    );
  }
}
