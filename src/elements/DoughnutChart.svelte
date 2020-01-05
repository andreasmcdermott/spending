<script>
  import Chart from './Chart.svelte';
  import { buildOptions } from '../utils/chart';

  export let title;
  export let data;

  $: labels = data ? data.map(d => d.label) : [];
  $: datasets = data
    ? [
        {
          data: data.map(d => d.value),
          backgroundColor: data.map(d => d.color)
        }
      ]
    : [];
</script>

<Chart type="doughnut" bind:labels bind:datasets options={buildOptions({ title, legend: false })} />
