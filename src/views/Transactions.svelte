<script>
  import { getAccountById } from '../accounts/store';
  import Header from '../elements/Header.svelte';
  import Breadcrumbs from '../elements/Breadcrumbs.svelte';
  import Form from '../elements/Form.svelte';
  import Link from '../router/Link.svelte';
  import Input from '../elements/Input.svelte';
  import Button from '../elements/Button.svelte';
  import Select from '../elements/Select.svelte';
  import PeriodPicker from '../accounts/PeriodPicker.svelte';
  import NewCategoryForm from '../categories/NewCategoryForm.svelte';
  import NewFilterForm from '../categories/NewFilterForm.svelte';
  import TransactionsTable from '../transactions/TransactionsTable.svelte';
  import { updateTransactions, getTransactionsForAccountAndPeriod } from '../transactions/store';
  import { goto } from '../router/fns';

  export let id;

  $: account = getAccountById(id);

  let period = '';
  let overrides = {};
  let rowsWithChanges = [];
  const rows = getTransactionsForAccountAndPeriod(id, period);
  $: {
    rows.setPeriod(period);
    rowsWithChanges = $rows.map(r => {
      if (overrides[r.id]) {
        r.category = overrides[r.id];
      }
      return r;
    });
  }
</script>

<Header>
  <Breadcrumbs items={[{ to: '..', name: account.name }, { name: 'Transactions' }]} />
</Header>

{#if account}
  <div class="border border-gray-200 p-2">
    <PeriodPicker {id} bind:value={period} />
  </div>
  {#if rowsWithChanges.length}
    <div class="flex">
      <div class="w-1/2 mr-2">
        <NewCategoryForm />
      </div>
      <div class="w-1/2 ml-2">
        <NewFilterForm
          on:created={() => {
            overrides = { ...overrides };
          }} />
      </div>
    </div>
    <TransactionsTable
      flipAmount={account.flipAmount}
      bind:rows={rowsWithChanges}
      on:change={e => {
        overrides = { ...overrides, [e.detail.rowId]: e.detail.categoryId };
      }} />

    <div class="mt-4">
      <Button
        type="submit"
        on:click|preventDefault={() => {
          updateTransactions($rows
              .filter(r => overrides[r.id])
              .map(r => {
                r.category = overrides[r.id];
                return r;
              }));
          period = '';
        }}>
        Save
      </Button>
      <span class="ml-2">
        <Link to="..">Cancel</Link>
      </span>
    </div>
  {/if}
{:else}
  <em>Account with ID "{id}" doesn't exist...</em>
{/if}
