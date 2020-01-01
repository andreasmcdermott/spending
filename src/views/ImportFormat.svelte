<script>
  import { getAccountById } from '../accounts/store';
  import Header from '../elements/Header.svelte';
  import Link from '../router/Link.svelte';
  import Icon from '../elements/Icon.svelte';
  import Form from '../elements/Form.svelte';
  import Button from '../elements/Button.svelte';
  import ColumnTypePicker from '../elements/ColumnTypePicker.svelte';
  import Input from '../elements/Input.svelte';
  import { getHeaders } from '../utils/csv';
  import { getNameByValue } from '../utils/enums';
  import ColumnTypes, { guessType } from '../enums/column-types';

  export let id;

  $: account = getAccountById(id) || {};

  let columns = [];
  let loadedFile = null;
</script>

<Header>
  <div class="flex items-center">
    <Link styles="uppercase tracking-widest" to={`/accounts/${id}`}>{account.name}</Link>
    <span class="mx-4">
      <Icon name="chevron-right" />
    </span>
    <span>Define Import Format</span>
  </div>
</Header>

<Form header="Select File">
  <div class="flex justify-between">
    <Input
      type="file"
      name="file"
      on:change|preventDefault={e => {
        loadedFile = e.target.files[0];
        getHeaders(loadedFile).then(cols => {
          columns = cols.map(c => ({ name: c, type: guessType(c) }));
        });
      }} />
  </div>
</Form>

{#if loadedFile && columns && columns.length}
  <div class="flex flex-col mt-4">
    <div class="flex border-solid border-gray-300 border-b mb-4">
      <strong class="w-1/4">Name</strong>
      <strong>Type</strong>
    </div>
    {#each columns as column}
      <div class="flex items-center mb-2">
        <div class="w-56">{column.name}</div>
        <div>
          <ColumnTypePicker bind:value={column.type} />
        </div>
      </div>
    {/each}

    <div class="flex mt-4">
      <Button type="submit">Save Format</Button>
      <div class="ml-2">
        <Button
          on:click={() => {
            columns = columns.map(c => ({
              ...c,
              type: c.type === ColumnTypes.NotDefined ? ColumnTypes.Ignored : c.type
            }));
          }}>
          Ignore remaining
        </Button>
      </div>
    </div>
  </div>
{:else if loadedFile}
  <em class="mt-4">Failed to load columns</em>
{/if}
