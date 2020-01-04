<script>
  import { categories } from './store';
  import Select from '../elements/Select.svelte';

  export let value = null;
</script>

<Select bind:value on:change>
  <option value="">Select a category</option>
  {#each $categories as c (c.id)}
    <option value={c.id}>{c.name}</option>
  {/each}
</Select>
