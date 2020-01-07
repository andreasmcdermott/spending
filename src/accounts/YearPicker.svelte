<script>
  import Select from '../elements/Select.svelte';
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

  if (!value) {
    value = years[years.length - 1];
  }
</script>

<Select bind:value on:change>
  <option value="">Select year</option>
  {#each years as year}
    <option value={year}>{year}</option>
  {/each}
</Select>
