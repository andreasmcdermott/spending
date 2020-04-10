<script>
  import { createEventDispatcher } from 'svelte';
  import Select from './Select.svelte';

  const dispatch = createEventDispatcher();

  export let name = undefined;
  export let id = undefined;
  export let values;
  export let items;
  export let empty = 'Select';

  $: itemMap = items.reduce((acc, item) => {
    acc[item.id] = item.label;
    return acc;
  }, {});

  let value = '';
</script>

<div class="flex items-start">
  <div class="mr-2">
    <Select
      {id}
      {name}
      bind:value
      on:change={() => {
        values = [...values, value];
        value = '';
        dispatch('change', values);
      }}>
      <option value="">{empty}</option>
      {#each items as item}
        <option value={item.id}>{item.label}</option>
      {/each}
    </Select>
  </div>
  <div class="flex flex-wrap">
    {#each values as v}
      <div class="text-sm px-2 py-1 border border-gray-400 bg-gray-200 m-1">
        {itemMap[v]}
        <button
          class="ml-1"
          on:click={() => {
            values = values.filter(value => value !== v);
          }}>
          x
        </button>
      </div>
    {/each}
  </div>
</div>
