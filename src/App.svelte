<script>
  import Nav from "./elements/Nav.svelte";
  import Route from "./router/Route.svelte";
  import Dashboard from "./views/Dashboard.svelte";
  import CreateAccount from "./views/CreateAccount.svelte";
  import { loadDb } from "./db/db";

  const dbPromise = loadDb();
</script>

<style lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>

{#await dbPromise}
  <!-- Nothing for now -->
{:then}
  <div class="flex min-h-screen">
    <Nav />
    <main class="flex-auto p-4">
      <Route path="/">
        <Dashboard />
      </Route>
      <Route path="/accounts/create">
        <CreateAccount />
      </Route>
    </main>
  </div>
{:catch}
  <!-- Nothing for now -->
{/await}
