<script>
  import Select from '../elements/Select.svelte';

  export let years;
  export let value = '';

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
