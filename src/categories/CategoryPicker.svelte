<script>
  import { categories } from './store';
  import Select from '../elements/Select.svelte';

  export let value = null;
  export let id = undefined;
  export let name = 'category';
</script>

<Select bind:value on:change {name} {id}>
  <option value="">Select a category</option>
  {#each $categories as c (c.id)}
    <option value={c.id}>{c.name}</option>
  {/each}
</Select>
