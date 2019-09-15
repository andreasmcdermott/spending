<script>
  import { createEventDispatcher } from "svelte";
  import { labelifyCamelCase } from "../utils/fns";

  export let types;
  export let name;
  export let selected = null;

  const dispatch = createEventDispatcher();

  const handleChange = e => {
    dispatch("change", selected);
  };
</script>

{#each Object.entries(types) as [key, value]}
  <label class="mr-4">
    <input
      type="radio"
      class="mr-1"
      {name}
      {value}
      bind:group={selected}
      on:change={handleChange} />
    <span class="uppercase tracking-widest text-xs">
      {labelifyCamelCase(key)}
    </span>
  </label>
{/each}
