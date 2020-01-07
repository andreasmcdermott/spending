<script>
  import Chart from './Chart.svelte';
  import { buildOptions } from '../utils/chart';

  export let title;
  export let data;
  export let label;

  $: labels = data ? data.map(d => d.label) : [];
  $: datasets = data
    ? [
        {
          label,
          data: data.map(d => d.value),
          backgroundColor: (data[0] || {}).color
        }
      ]
    : [];
</script>

<Chart type="bar" bind:labels bind:datasets options={buildOptions({ title })} />
