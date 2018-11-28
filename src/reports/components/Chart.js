import React from 'react';
import ChartJs from 'chart.js';

export default class Chart extends React.Component {
  canvasRef = React.createRef();
  chart = null;

  getData() {
    return {
      datasets: [
        {
          data: this.props.data.map(x => x.value),
          backgroundColor: this.props.data.map(x => x.color)
        }
      ],
      labels: this.props.data.map(x => x.label)
    };
  }

  componentDidMount() {
    this.chart = new ChartJs(this.canvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: this.getData(),
      options: {
        maintainAspectRatio: false,
        legend: { display: true, labels: { fontColor: 'black', strokeStyle: 'black' } }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.chart.data = this.getData();
      this.chart.update();
    }
  }

  render() {
    return (
      <div className="bg-blue-lightest p-2 mb-2">
        <h3 className="font-normal pb-1 mb-2 border-b border-blue-dark">
          {this.props.title}
        </h3>
        <div className="relative" style={{ height: 500 }}>
          <canvas ref={this.canvasRef} />
        </div>
      </div>
    );
  }
}
