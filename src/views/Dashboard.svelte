<script>
  import Header from '../elements/Header.svelte';
  import Button from '../elements/Button.svelte';
  import AllAccountSummary from '../dashboard/AllAccountSummary.svelte';
  import { accounts } from '../accounts/store';
  import { goto } from '../router/fns';

  let year = new Date().getFullYear();
</script>

<div class="flex flex-col h-full">
  <Header>Dashboard</Header>

  {#if !$accounts.length}
    <div class="flex flex-auto items-center justify-center">
      <Button type="submit" on:click={() => goto('/accounts/create')}>
        Create your first Account
      </Button>
    </div>
  {:else}
    <div>
      <AllAccountSummary />
    </div>
  {/if}
</div>
