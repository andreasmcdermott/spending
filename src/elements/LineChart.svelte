<script>
  import Chart from './Chart.svelte';
  import { buildOptions } from '../utils/chart';

  export let title;
  export let data;
  export let labels = null;


  $: {
    if (!labels) {
      labels = data ? Object.keys(data[0].values) : [];
    }
  }
  $: datasets = data
    ? data.map(d => ({
      label: d.label,
        data: Object.values(d.values),
        backgroundColor: d.color,
        borderColor: d.color,
        fill: false
      }))
    : [];
</script>

<Chart
  type="line"
  bind:labels
  bind:datasets
  options={buildOptions({ title, legend: { display: true } })} />
