<script>
  import YearPicker from '../elements/YearPicker.svelte';
  import { getAllPeriodsForAccount } from '../transactions/store';

  export let id;
  export let value = '';

  const years = getAllPeriodsForAccount(id)
    .map(p => p.substr(0, 4))
    .reduce((acc, year) => {
      if (!acc.includes(year)) acc.push(year);
      return acc;
    }, [])
    .sort();
</script>

<YearPicker {years} bind:value on:change />
