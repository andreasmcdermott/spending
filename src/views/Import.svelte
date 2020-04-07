<script>
  import { getAccountById } from '../accounts/store';
  import Header from '../elements/Header.svelte';
  import Breadcrumbs from '../elements/Breadcrumbs.svelte';
  import Form from '../elements/Form.svelte';
  import Link from '../router/Link.svelte';
  import Input from '../elements/Input.svelte';
  import Button from '../elements/Button.svelte';

  import NewCategoryForm from '../categories/NewCategoryForm.svelte';
  import NewFilterForm from '../categories/NewFilterForm.svelte';
  import TransactionsTable from '../transactions/TransactionsTable.svelte';
  import { importRows } from '../utils/csv';
  import { mapToImportFormat } from '../utils/importFormat';
  import uuid from '../utils/uuid';
  import { categories } from '../categories/store';
  import { importTransactions } from '../transactions/store';
  import { goto } from '../router/fns';
  import { createCachedStore } from '../utils/cachedStore';

  export let id;
  let filter = '';

  $: account = getAccountById(id);

  const rows = createCachedStore(`current-rows-${id}`, []);
  const manuallyMappedRows = createCachedStore(`current-manual-mapping-${id}`, {});
  let fileLoaded = $rows.length > 0;

  const setRows = result => {
    $rows = result.data.map(r => {
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

  $: mappedRows = mapRows($rows, $manuallyMappedRows);
</script>

<Header>
  <Breadcrumbs items={[{ to: '..', name: account.name }, { name: 'Import' }]} />
</Header>

{#if account}
  {#if !fileLoaded}
    <div>
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
    </div>
  {:else}
    <div class="flex">
      <div class="w-1/2 mr-2">
        <NewCategoryForm />
      </div>
      <div class="w-1/2 ml-2">
        <NewFilterForm
          bind:value={filter}
          on:created={() => {
            mappedRows = [...mappedRows];
          }} />
      </div>
    </div>
  {/if}
{:else}
  <em>Account with ID "{id}" doesn't exist...</em>
{/if}

{#if fileLoaded && mappedRows.length}
  <TransactionsTable
    flipAmount={!account.flipAmount}
    bind:rows={mappedRows}
    on:change={e => {
      $manuallyMappedRows = { ...$manuallyMappedRows, [e.detail.rowId]: e.detail.categoryId };
    }}
    on:filter={e => {
      filter = e.detail;
    }} />

  <div class="mt-4">
    <Button
      type="submit"
      on:click|preventDefault={() => {
        if (mappedRows.length > 0 && mappedRows.every(r => r.category)) {
          importTransactions(id, mappedRows);
          rows.clear();
          manuallyMappedRows.clear();
          goto('..');
        }
      }}>
      Save
    </Button>
    <span class="ml-2">
      <Link
        to=".."
        on:click={() => {
          rows.clear();
          manuallyMappedRows.clear();
        }}>
        Cancel
      </Link>
    </span>
  </div>
{/if}
