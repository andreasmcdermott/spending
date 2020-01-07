<script>
import Select from './Select.svelte';

export let name = undefined;
export let id = undefined;
export let values;
export let items;
export let empty = 'Select'

let value = '';
</script>

<Select {id} {name} bind:value on:change={() => {
  values = [...values, value];
  value = '';
}}>
<option value="">{empty}</option>
{#each items as item}
  <option value={item.id}>{item.label}</option>
{/each}
</Select>