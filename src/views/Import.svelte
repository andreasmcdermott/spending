<script>
  import { getAccountById } from '../accounts/store';
  import Header from '../elements/Header.svelte';
  import Breadcrumbs from '../elements/Breadcrumbs.svelte';
  import Form from '../elements/Form.svelte';
  import Input from '../elements/Input.svelte';
  import { importRows } from '../utils/csv';
  import { mapToImportFormat } from '../utils/importFormat';
  import uuid from '../utils/uuid';
  import { categories } from '../categories/store';

  export let id;

  $: account = getAccountById(id);

  let rows = [];
  let loadedFile = null;

  const setRows = result => {
    rows = result.data.map(r => {
      r.uuid = uuid();
      return r;
    });
  };

  const mapRows = rows => {
    const mapRow = mapToImportFormat(account.importFormat);
    return rows.map(mapRow);
  };

  $: mappedRows = mapRows(rows);
</script>

<Header>
  <Breadcrumbs items={[{ to: '..', name: account.name }, { name: 'Import' }]} />
</Header>

{#if account}
  <Form header="Select File">
    <div class="flex justify-between">
      <Input
        type="file"
        name="file"
        on:change|preventDefault={e => {
          loadedFile = e.target.files[0];
          importRows(loadedFile).then(setRows);
        }} />
    </div>
  </Form>
{:else}
  <em>Account with ID "{id}" doesn't exist...</em>
{/if}

{#if loadedFile && rows && rows.length}
  <div class="flex flex-col">
    {#each mappedRows as row (row.id)}
      <div class="flex justify-evenly">
        <div>{row.id}</div>
        <div>date</div>
        <div>period</div>
        <div>description</div>
        <div>amount</div>
        <div>category</div>
      </div>
    {/each}
  </div>
{/if}
