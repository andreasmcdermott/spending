<script>
  import { updateCategory, removeCategory } from './store';
  import CategoryTypePicker from './CategoryTypePicker.svelte';
  import FilterList from './FilterList.svelte';
  import ColorPicker from '../elements/ColorPicker.svelte';
  import Input from '../elements/Input.svelte';
  import Button from '../elements/Button.svelte';
  import { getNameByValue } from '../utils/enums';

  export let category;

  let editName = false;
  let categoryName;
  let inputEl = null;

  $: {
    if (inputEl) inputEl.focus();
  }
</script>

<h2 class="font-bold">
  {#if editName}
    <Input
      bind:this={inputEl}
      placeholder="Category Name"
      bind:value={category.name}
      on:keydown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          updateCategory(category);
          editName = false;
        } else if (e.key === 'Escape') {
          category.name = categoryName;
          editName = false;
        }
      }} />
  {:else}
    <span
      class="cursor-pointer"
      on:click={() => {
        categoryName = category.name;
        editName = true;
      }}>
      {category.name}
    </span>
  {/if}
  <span class="ml-2 text-xs uppercase tracking-widest text-gray-500">
    {getNameByValue(category.type)}
  </span>
</h2>
<div class="py-2 px-3 bg-gray-100 border-gray-300 border">
  <div class="flex justify-between">
    <div class="flex-none">
      <CategoryTypePicker
        name={`type-${category.id}`}
        bind:selected={category.type}
        on:change={() => updateCategory(category)} />
    </div>
    <div class="flex">
      <span class="ml-6">
        <ColorPicker bind:color={category.color} on:change={() => updateCategory(category)} />
      </span>
      <span class="ml-6">
        <Button size="sm" on:click={() => removeCategory(category.id)}>Remove</Button>
      </span>
    </div>
  </div>
</div>
<FilterList
  bind:filters={category.filters}
  on:change={e => updateCategory(category)}
  on:remove={e => updateCategory({
      ...category,
      filters: category.filters.filter(f => f !== e.detail)
    })} />
