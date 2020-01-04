<script>
  import { getAccountById, removeAccount } from '../accounts/store';
  import { getTransactionForAccount } from '../transactions/store';
  import Header from '../elements/Header.svelte';
  import Button from '../elements/Button.svelte';
  import { getNameByValue } from '../utils/enums';
  import AccountTypes from '../enums/account-types';
  import Link from '../router/Link.svelte';
  import { goto } from '../router/fns';

  export let id;

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
    <Button size="sm" on:click={() => goto(`/accounts/${id}/format`)}>Define Format</Button>
    <Button size="sm" on:click={() => goto(`/accounts/${id}/import`)}>Import</Button>
    <Button size="sm" on:click={handleRemove}>Remove</Button>
  </div>
</div>

<div />
