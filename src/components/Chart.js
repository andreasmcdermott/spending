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
            data: Object.values(this.props.data).map(x => x.amount),
            backgroundColor: Object.values(this.props.data).map(x => x.color)
          }
        ],
        labels: Object.values(this.props.data).map(x => x.categoryName)
      },
      options: {
        title: {
          text: this.props.title,
          display: true
        }
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
