<script>
  import CategoryTypes from '../enums/category-types';

  export let name;
  export let selected = null; 
</script>

{#each Object.entries(CategoryTypes) as [key, value]}
  <label class="mr-4">
    <input type="radio" class="mr-1" {name} {value} bind:group={selected} />
    <span class="uppercase tracking-widest text-xs">{key}</span>
  </label>
{/each}