<script>
  import Link from "../router/Link.svelte";
  import { accounts } from "../accounts/store";
</script>

<nav class="flex-none p-4 flex flex-col">
  <h1>Accounts</h1>
  <ul>
    {#each $accounts as account}
      <li>{account.name}</li>
    {:else}
      <li>
        <em>No accounts</em>
      </li>
    {/each}
  </ul>
  <Link to="/accounts/create">Create Account</Link>
  <h1 class="mt-auto">Categories</h1>
</nav>
