<script>
  import { createEventDispatcher } from 'svelte';
  import { categories } from '../categories/store';
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import Input from '../elements/Input.svelte';
  import Select from '../elements/Select.svelte';
  import Button from '../elements/Button.svelte';
  import Icon from '../elements/Icon.svelte';
  import { sortBy } from '../utils/fns';
  import { formatForDisplay } from '../utils/transactions';

  export let rows;
  export let flipAmount = false;

  const dispatch = createEventDispatcher();

  const filterOptions = { All: 'all', Mapped: 'mapped', Unmapped: 'unmapped' };
  let mappedFilter = null;
  let manualFilter = '';
  let sortField = 'date';
  let manualFilterEl = null;

  const categoryIdToName = $categories.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});
  const sortByCategory = (t1, t2) => {
    const c1 = categoryIdToName[t1.category] || '';
    const c2 = categoryIdToName[t2.category] || '';
    return c1.localeCompare(c2);
  };

  $: filteredRows = rows
    .filter(r => {
      let show = true;
      if (mappedFilter === filterOptions.Mapped) show = show && !!r.category;
      if (mappedFilter === filterOptions.Unmapped) show = show && !r.category;
      if (manualFilter) show = show && new RegExp(manualFilter, 'gi').test(r.description);
      return show;
    })
    .sort(sortField === 'category' ? sortByCategory : sortBy(sortField));
  $: mappedRowCount = rows.filter(r => !!r.category).length;
  $: unmappedRowCount = rows.filter(r => !r.category).length;

  $: {
    if (mappedFilter === null) {
      if (unmappedRowCount > 0) mappedFilter = filterOptions.Unmapped;
      else mappedFilter = filterOptions.All;
    }
  }
</script>

<style>
  .child {
    visibility: hidden;
  }

  .show-child-on-hover:hover .child {
    visibility: visible;
  }
</style>

<div class="flex justify-between border p-2 items-center mt-4">
  <div class="w-1/4">
    <RadioPicker
      name="filter"
      types={filterOptions}
      bind:selected={mappedFilter}
      on:change={() => {
        if (mappedFilter === filterOptions.Mapped) {
          sortField = 'category';
        } else if (mappedFilter === filterOptions.Unmapped) {
          sortField = 'date';
        }
      }} />
  </div>
  <div class="w-1/2">
    <Input
      width="half"
      bind:this={manualFilterEl}
      placeholder="Filter"
      bind:value={manualFilter}
      on:keydown={e => {
        if (e.key === 'Enter') {
          dispatch('filter', manualFilter);
          manualFilter = '';
        } else if (e.key === 'Escape') {
          manualFilter = '';
        }
      }} />
    <Select bind:value={sortField}>
      <option value="date">Date</option>
      <option value="description">Description</option>
      <option value="amount">Amount</option>
      <option value="category">Category</option>
    </Select>
  </div>
  <div class="w-1/4 text-right">
    <strong class="mr-2">Mapped</strong>
    <span class="mr-4">{mappedRowCount}</span>
    <strong class="mr-2">Unmapped</strong>
    <span>{unmappedRowCount}</span>
  </div>
</div>
<div class="flex flex-col mt-4">
  {#each filteredRows as row, i (row.id)}
    <div
      class="flex justify-evenly items-center py-2 px-1 {i % 2 === 0 ? 'bg-gray-100' : ''}
      show-child-on-hover">
      <div class="w-2/12">{row.date.toLocaleDateString('sv-SE')}</div>
      <div class="w-6/12 pr-2 flex items-center">
        <div class="child mr-2">
          <Button
            size="sm"
            display="text"
            on:click={() => {
              manualFilter = row.description;
              manualFilterEl.focus();
            }}>
            <Icon name="pen-tool" />
          </Button>
        </div>
        <div>{row.description}</div>
      </div>
      <div class="w-1/12 text-right">{formatForDisplay(row.amount, flipAmount)}</div>
      <div class="w-3/12 text-right">
        <CategoryPicker
          value={row.category}
          on:change={e => {
            dispatch('change', { rowId: row.id, categoryId: e.target.value });
          }} />
      </div>
    </div>
  {/each}
</div>
