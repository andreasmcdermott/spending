<script>
  import LineChart from '../elements/LineChart.svelte';
  import PeriodPicker from '../accounts/PeriodPicker.svelte';
  import CategoryPicker from '../categories/CategoryPicker.svelte';

  export let id;

  let category = '';
  let period = '';
</script>

<div>
  <div class="flex justify-end">
    <div class="mr-2">
      <PeriodPicker {id} bind:value={period} on:change={() => (category = '')} />
    </div>
    <div>
      <CategoryPicker bind:value={category} on:change={() => (period = '')} />
    </div>
  </div>
  <LineChart />
</div>
