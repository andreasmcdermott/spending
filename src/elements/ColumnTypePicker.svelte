<script>
  import Select from './Select.svelte';
  import ColumnTypes from '../enums/column-types';

  export let value = '';
</script>

<Select bind:value>
  <option value="">Select a value</option>
  {#each Object.entries(ColumnTypes) as [name, id]}
    <option value={id}>{name}</option>
  {/each}
</Select>
