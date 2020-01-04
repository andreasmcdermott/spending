<script>
  import { getAccountById } from '../accounts/store';
  import Header from '../elements/Header.svelte';
  import RadioPicker from '../elements/RadioPicker.svelte';
  import Breadcrumbs from '../elements/Breadcrumbs.svelte';
  import Form from '../elements/Form.svelte';
  import Input from '../elements/Input.svelte';
  import Select from '../elements/Select.svelte';
  import Button from '../elements/Button.svelte';
  import CategoryPicker from '../categories/CategoryPicker.svelte';
  import NewCategoryForm from '../categories/NewCategoryForm.svelte';
  import NewFilterForm from '../categories/NewFilterForm.svelte';
  import { importRows } from '../utils/csv';
  import { mapToImportFormat } from '../utils/importFormat';
  import uuid from '../utils/uuid';
  import { categories } from '../categories/store';
  import { importTransactions } from '../transactions/store';
  import { goto } from '../router/fns';
  import { sortBy } from '../utils/fns';

  export let id;

  $: account = getAccountById(id);

  let rows = [];
  let manuallyMappedRows = {};
  let fileLoaded = false;

  const setRows = result => {
    rows = result.data.map(r => {
      r.uuid = uuid();
      return r;
    });
  };

  const mapRows = (allRows, manualRows) => {
    const mapRow = mapToImportFormat(account.importFormat);
    const manualMapping = Object.entries(manualRows);
    return allRows.map(mapRow).map(row => {
      if (manualRows[row.id]) {
        row.category = manualRows[row.id];
      }
      return row;
    });
  };

  const filterOptions = { All: 'all', Mapped: 'mapped', Unmapped: 'unmapped' };
  let filter = filterOptions.All;
  let manualFilter = '';
  let sortField = 'date';

  $: mappedRows = mapRows(rows, manuallyMappedRows);
  $: filteredRows = mappedRows.filter(r => {
    let show = true;
    if (filter === filterOptions.Mapped) show = show && !!r.category;
    if (filter === filterOptions.Unmapped) show = show && !r.category;
    if (manualFilter) show = show && new RegExp(manualFilter, 'gi').test(r.description);
    return show;
  });
  $: {
    filteredRows.sort(sortBy(sortField));
  }
  $: mappedRowCount = mappedRows.filter(r => !!r.category).length;
  $: unmappedRowCount = mappedRows.filter(r => !r.category).length;
</script>

<Header>
  <Breadcrumbs items={[{ to: '..', name: account.name }, { name: 'Import' }]} />
</Header>

{#if account}
  {#if !fileLoaded}
    <Form header="Select File">
      <div class="flex justify-between">
        <Input
          type="file"
          name="file"
          on:change|preventDefault={e => {
            fileLoaded = true;
            importRows(e.target.files[0]).then(setRows);
          }} />
      </div>
    </Form>
  {:else}
    <div class="flex">
      <div class="w-1/2 mr-2">
        <NewCategoryForm />
      </div>
      <div class="w-1/2 ml-2">
        <NewFilterForm
          on:created={() => {
            mappedRows = { ...mappedRows };
          }} />
      </div>
    </div>
  {/if}
{:else}
  <em>Account with ID "{id}" doesn't exist...</em>
{/if}

{#if fileLoaded && rows && rows.length}
  <div class="flex justify-between border p-2 items-center mt-4">
    <div>
      <RadioPicker name="filter" types={filterOptions} bind:selected={filter} />
    </div>
    <div>
      <Input placeholder="Filter" bind:value={manualFilter} />
      <Select bind:value={sortField}>
        <option value="date">Date</option>
        <option value="desc">Description</option>
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
              manuallyMappedRows = { ...manuallyMappedRows, [row.id]: e.target.value };
            }} />
        </div>
      </div>
    {/each}
    <div class="mt-4">
      <Button
        type="submit"
        on:click|preventDefault={() => {
          if (unmappedRowCount === 0 && mappedRowCount > 0) {
            importTransactions(id, mappedRows);
            goto('..');
          }
        }}>
        Save
      </Button>
    </div>
  </div>
{/if}
