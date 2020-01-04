<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  export let type = 'line';

  let el;
  onMount(() => {
    new Chart(el.getContext('2d'), {
      type
    });
  });
</script>

<canvas bind:this={el} class="w-full, h-full" />
