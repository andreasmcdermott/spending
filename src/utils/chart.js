import { formatAmount } from './formatting';

export function buildOptions(options) {
  return {
    legend: options.legend,
    title: { display: true, text: options.title },
    xAxes: [
      {
        display: true,
        scaleLabel: { display: true, labelString: 'XXX' },
      },
    ],
    yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'YYY' } }],
    scales: {
      yAxes: [{ ticks: { callback: (value) => formatAmount(value) } }],
    },
  };
}
