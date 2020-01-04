<script>
  import Link from '../router/Link.svelte';
  import Icon from '../elements/Icon.svelte';
  import Header from '../elements/Header.svelte';
  import { accounts } from '../accounts/store';
  import { categories } from '../categories/store';
</script>

<nav class="flex-none p-4 flex flex-col bg-blue-800 text-blue-100 max-h-screen overflow-auto">
  <Header>
    <span>Accounts</span>
    <Link to="/accounts/create">
      <span class="font-bold">
        <Icon name="plus" label="Add" color="#fff" />
      </span>
    </Link>
  </Header>

  <ul class="text-lg">
    {#each $accounts as account}
      <li class="my-1">
        <Link block={true} to={`/accounts/${account.id}`}>{account.name}</Link>
      </li>
    {:else}
      <li>
        <em>No accounts</em>
      </li>
    {/each}
  </ul>

  <div class="mt-auto pt-2 text-sm">
    <span class="mr-1">
      <Link to="/">Dashboard</Link>
    </span>
    <span class="mr-1">
      <Link to="/categories">Categories</Link>
    </span>
    <span>
      <Link to="/profile">Profile</Link>
    </span>
    <div class="mt-2 text-sm">
      <Link to="/admin">Admin</Link>
    </div>
  </div>
</nav>
