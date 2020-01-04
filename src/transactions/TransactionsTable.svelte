<script>
  import { createEventDispatcher } from 'svelte';
  import { categories } from '../categories/store';
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import Input from '../elements/Input.svelte';
  import Select from '../elements/Select.svelte';
  import { sortBy } from '../utils/fns';

  export let rows;

  const dispatch = createEventDispatcher();

  const filterOptions = { All: 'all', Mapped: 'mapped', Unmapped: 'unmapped' };
  let mappedFilter = filterOptions.All;
  let manualFilter = '';
  let sortField = 'date';

  const categoryIdToName = $categories.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});
  const sortByCategory = (t1, t2) => {
    const c1 = categoryIdToName[t1.category];
    const c2 = categoryIdToName[t2.category];
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
</script>

<div class="flex justify-between border p-2 items-center mt-4">
  <div>
    <RadioPicker name="filter" types={filterOptions} bind:selected={mappedFilter} />
  </div>
  <div>
    <Input placeholder="Filter" bind:value={manualFilter} />
    <Select bind:value={sortField}>
      <option value="date">Date</option>
      <option value="description">Description</option>
      <option value="amount">Amount</option>
      <option value="category">Category</option>
    </Select>
  </div>
  <div>
    <strong class="mr-2">Mapped</strong>
    <span class="mr-4">{mappedRowCount}</span>
    <strong class="mr-2">Unmapped</strong>
    <span>{unmappedRowCount}</span>
  </div>
</div>
<div class="flex flex-col mt-4">
  {#each filteredRows as row, i (row.id)}
    <div class="flex justify-evenly items-center my-1 px-1 {i % 2 === 0 ? 'bg-gray-100' : ''}">
      <div class="w-2/12">{row.date.toLocaleDateString('sv-SE')}</div>
      <div class="w-6/12 pr-2">{row.description}</div>
      <div class="w-1/12 text-right">{row.amount}</div>
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
