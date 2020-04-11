<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  export let type = 'line';
  export let datasets;
  export let labels;
  export let options = {};

  let el;
  let chart;
  onMount(() => {
    chart = new Chart(el.getContext('2d'), {
      type,
      data: {
        datasets,
        labels
      },
      options: options
    });
  });

  $: {
    if (chart && datasets && labels) {
      chart.data = { datasets, labels };
      chart.options = options;
      chart.update();
    }
  }
</script>

<div class="w-full max-w-6xl mx-auto">
  <canvas bind:this={el} class="w-full, h-full" />
</div>
