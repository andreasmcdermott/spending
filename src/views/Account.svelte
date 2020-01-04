<script>
  import { getAccountById, removeAccount } from '../accounts/store';
  import { getTransactionForAccount } from '../transactions/store';
  import Header from '../elements/Header.svelte';
  import Button from '../elements/Button.svelte';
  import { getNameByValue } from '../utils/enums';
  import AccountTypes from '../enums/account-types';
  import Link from '../router/Link.svelte';
  import { goto } from '../router/fns';
  import { hasCachedData, clearCachedData } from '../utils/cachedStore';

  export let id;

  const storeIds = [`current-rows-${id}`, `current-manual-mapping-${id}`];
  let importInProgress = storeIds.some(id => hasCachedData(id));

  $: account = getAccountById(id);
  $: transactions = getTransactionForAccount(id);

  $: {
    console.log(account);
    console.log($transactions);
  }

  const handleRemove = () => {
    removeAccount(id);
    goto('/');
  };
</script>

<Header>{account.name}</Header>

<div class="bg-gray-100 border b-gray-300 py-2 px-4 flex justify-between items-center">
  <span class="uppercase tracking-widest text-xs">
    {getNameByValue(AccountTypes, account.type)}
  </span>
  <div>
    {#if !account.importFormat.columns.length}
      <Button size="sm" on:click={() => goto('format')}>Define Format</Button>
    {:else}
      <Button size="sm" on:click={() => goto('update')}>Update</Button>
      <Button size="sm" on:click={() => goto('import')}>Import</Button>
    {/if}
    <Button size="sm" on:click={handleRemove}>Remove</Button>
  </div>
</div>

<div>

  {#if importInProgress}
    <div class="flex items-center justify-center mt-4">
      <div class="p-4 border flex flex-col justify-center">
        <p>You have an import in progress.</p>
        <div class="mt-4 text-center">
          <Button type="submit" on:click={() => goto('import')}>Continue</Button>
          <Button
            on:click={() => {
              storeIds.forEach(clearCachedData);
              importInProgress = false;
            }}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  {/if}
</div>
