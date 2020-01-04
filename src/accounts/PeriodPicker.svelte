<script>
  import Select from '../elements/Select.svelte';
  import { getAllPeriodsForAccount } from '../transactions/store';

  export let id;
  export let value = '';

  const periods = getAllPeriodsForAccount(id);
</script>

<Select bind:value on:change>
  <option value="">Select period</option>
  {#each periods as period}
    <option value={period}>{period}</option>
  {/each}
</Select>
