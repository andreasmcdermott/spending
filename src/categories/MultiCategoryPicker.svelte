<script>
  import { createEventDispatcher } from 'svelte';
  import { categories } from './store';
  import MultiSelect from '../elements/MultiSelect.svelte';
  import Button from '../elements/Button.svelte';

  const dispatch = createEventDispatcher();

  export let values = [];
  export let id = undefined;
  export let name = 'categories';
  export let categoryTypes = null;

  const filterByCategoryType = category => {
    if (!categoryTypes) return true;
    if (Array.isArray(categoryTypes)) return categoryTypes.includes(category);
    return categoryTypes === category.type;
  };
  const items = $categories.filter(filterByCategoryType).map(c => ({ id: c.id, label: c.name }));

  const selectAll = () => {
    values = items.map(i => i.id);
    dispatch('change', values);
  };
  const selectNone = () => {
    values = [];
    dispatch('change', values);
  };
</script>

<div class="flex items-start">
  <div>
    <MultiSelect
      {values}
      on:change={e => {
        values = e.detail;
        dispatch('change', values);
      }}
      {name}
      {id}
      {items}
      empty="Select categories" />
  </div>
  <div class="flex-none py-1">

    <Button size="sm" on:click={values.length !== items.length ? selectAll : selectNone}>
      Select {values.length !== items.length ? 'all' : 'none'}
    </Button>

  </div>
</div>
